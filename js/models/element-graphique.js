"use strict";
/**
 * Définit les propriétés et méthodes d'un élément graphique du jeu
 */
class ElementGraphique
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		//Coordonnées de l'élément
		this._coordonnees = new Point();

		//Angle de rotation (radians)
		this._rotation = 0;

		//Taille de l'élément (utilisée pour la détection des collision)
		this._taille = 0;

		//Collection de textures associées à l'élément
		this._textures = new Textures();
	}

	/**
	 * Setters
	 */
	setCoordonnees(point) { this._coordonnees.copier(point); }
	setXY(valueX, valueY) { this._coordonnees.setXY(valueX, valueY); }
	setRotation(value) { this._rotation = value; }
	setTaille(value) { this._taille = value; }

	/**
	 * Getters
	 */
	getCoordonnees() { return this._coordonnees; }
	getX() { return this._coordonnees.getX(); }
	getY() { return this._coordonnees.getY(); }
	getRotation() { return this._rotation; }
	getTaille() { return this._taille; }
	getNombreTextures() { return this._textures.length(); }

	/**
	 * Ajoute une texture à l'élément graphique
	 * @param texture Texture à ajouter à l'élément graphique
	 */
	ajouterTexture(texture)
	{
		this._textures.add(texture);
	}

	/**
	 * Active la texture dont l'indice est donné en paramètre
	 * @param indiceTexture Indice de la texture à activer
	 */
	activerTexture(indiceTexture)
	{
		this._textures.activer(indiceTexture);
	}

	/**
	 * Retourne la texture active
	 */
	getTextureActive()
	{
		return this._textures.getTextureActive();
	}

	/**
	 * Retourne l'indice de la texture active
	 */
	getIndiceTextureActive()
	{
		return this._textures.getIndiceTextureActive();
	}

	/**
	 * Fonction de dessin de l'élément graphique
	 * @param context {Canvas2DContext} Context 2D du canvas sur lequel on souhaite dessiner l'élément graphique
	 */
	dessiner(context)
	{
		context.save();
		context.translate(this.getX(), this.getY());
		context.rotate(this.getRotation());

		var texture = this.getTextureActive();
		context.drawImage(texture, -texture.width / 2, -texture.height / 2);

		context.restore();
	}
}