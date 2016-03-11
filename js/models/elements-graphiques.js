"use strict";
/**
 * Collection des éléments graphiques présents sur le jeu
 */
class ElementsGraphiques extends Collection
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super(ElementGraphique);
	}

	/**
	 * Retourne le nombre de pampmousses mutants présents dans la liste
	 */
	getNombrePampmoussesMutants()
	{
		var nbPampmousses = 0;

		for (var iElement = 0; iElement < this.length() ; ++iElement)
		{
			if(this.get(iElement) instanceof PampmousseMutant)
				++nbPampmousses;
		}

		return nbPampmousses;
	}

	/**
	 * Anime l'ensemble des élements de la collection
	 */
	animer()
	{
		for(var iElement = 0; iElement < this.length(); ++iElement)
		{
			var element = this.get(iElement);

			if (element instanceof ElementMobile)
			{
				element.animer();
			}
		}
	}

	/**
	 * Dessine l'ensemble des élements de la collection
	 * @param context {Canvas2DContext} Context 2D du canvas sur lequel on souhaite dessiner les éléments graphiques
	 */
	dessiner(context)
	{
		for (var iElement = 0; iElement < this.length() ; ++iElement)
		{
			var element = this.get(iElement);
			element.dessiner(context);
		}
	}
}