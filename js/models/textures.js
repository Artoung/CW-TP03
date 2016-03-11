"use strict";
/**
 * Gestionnaires de textures
 */
class Textures extends Collection
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super(HTMLImageElement);

		this._indiceTextureActive = null;
	}

	/**
	 * Ajoute une texture à la collection et définit cette texture comme active
	 * @param element Texture à ajouter
	 */
	add(element)
	{
		super.add(element);

		this.activer(this.length() - 1);
	}

	/**
	 * Active la texture dont l'indice est donné en paramètre
	 * @param indiceTexture Indice de la texture à activer
	 */
	activer(indiceTexture)
	{
		if (indiceTexture < 0 || indiceTexture >= this.length())
			throw "Textures::activer - Indice incorrect (" + indiceTexture + " / 0 - " + this.length() + ")";

		this._indiceTextureActive = indiceTexture;
	}

	/**
	 * Retourne la texture actuellement active
	 * @return Retourne la texture active
	 * @throw Lève une exception si aucune texture n'est active
	 */
	getTextureActive()
	{
		try
		{
			return this.get(this._indiceTextureActive);
		}
		catch(exception)
		{
			throw "Textures::getTextureActive - Texture active invalide.";
		}
	}

	/**
	 * Retourne l'indice de la texture active
	 * @return Retourne l'indice de la texture active
	 */
	getIndiceTextureActive()
	{
		return this._indiceTextureActive;
	}
}