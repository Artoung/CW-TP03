"use strict";
/**
 * Fabrique des éléments graphiques du jeu
 */
class FabriqueElement
{
	/**
	 * Constructeur
	 */
	constructor()
	{

	}

	/**
	 * Crée un élément graphique du type donné
	 */
	create(typeElement)
	{
		var element = null;

		switch(typeElement)
		{
			case 'humain':
				element = new Humain();
				break;
			case 'pampmousse mutant':
				element = new PampmousseMutant();
				break;
			case 'munition':
				element = new Munition();
				break;
			case 'presse agrumes':
				element = new PresseAgrumes();
				break;
			default:
				throw "Type d'élément inconuu.";
		}

		return element;
	}
}