"use strict";
/**
 * Elément graphique représentant une munition
 */
class Munition extends ElementGraphique
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super();

		this.setTaille(10);
		this.ajouterTexture(texturePresseAgrumes);
	}
}