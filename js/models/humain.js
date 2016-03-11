"use strict";
/**
 * Elément mobile représentant le joueur
 */
class Humain extends ElementMobile
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super();

		//Points de vie du joueur
		this._pointsDeVie = 3;

		//Indique si le joueur est immunisé aux contacts des pampmousses mutants
		this._immunise = false;

		//Nombre de munitions du joueur
		this._munitions = 0;

		//Timer utilisé pour animer le clignotement du joueur
		this._timerClignotement = null;

		//Timer utilisé pour gérer la durée d'immunisation du joueur
		this._timerImmunisation = null;

		//Définit les textures à utiliser pour représenter le joueur
		this.ajouterTexture(textureHumain);
		this.ajouterTexture(textureHumainImmunise);
		this.activerTexture(0);

		//Définit la taille du joueur (pour détecter les collisions)
		this.setTaille(20);

		//Définit la vitesse de déplacement du joueur
		this.setVitesse(5);
	}

	/**
	 * Retourne le nombre de points de vie restant au joueur
	 */
	getPointsDeVie()
	{
		return this._pointsDeVie;
	}

	/**
	 * Retourne le nombre de munitions du joueur
	 */
	getMunitions()
	{
		return this._munitions;
	}

	/**
	 * Oriente le joueur en direction du point donné
	 * @param coordonnees Coordonnées vers lesquelles on souhaite voir le joueur se déplacer
	 */
	orienterVers(coordonnees)
	{
		var temp = new Point();
		temp.copier(this.getCoordonnees());
		temp.setX(temp.getX() + 10);

		this.setDirection(getAngle3Points(this.getCoordonnees(), temp, coordonnees) / 180 * Math.PI);
		this.setRotation(this.getDirection());
	}

	/**
	 * Démarre la phase d'immunité du joueur
	 */
	immuniser()
	{
		clearInterval(this._timerClignotement);
		clearTimeout(this._timerImmunisation);

		this._immunise = true;

		var that = this;
		this._timerClignotement = setInterval(function () { that.clignoter(); }, 100);
		this._timerImmunisation = setTimeout(function () { that.desimmuniser(); }, 3000);
	}

	/**
	 * Termine la phase d'immunité du joueur
	 */
	desimmuniser()
	{
		clearInterval(this._timerClignotement);
		clearTimeout(this._timerImmunisation);

		this._immunise = false;

		this.activerTexture(0);
	}

	/**
	 * Fait clignoter le joueur (alterne les deux textures du joueur)
	 */
	clignoter()
	{
		if (this.getIndiceTextureActive() == 0)
			this.activerTexture(1);
		else
			this.activerTexture(0);
	}

	/**
	 * Blesse le joueur -> -1 point de vie, +déclenchement de l'immunité temporaire
	 */
	blesser()
	{
		if (!this.estImmunise() && this.estVivant())
		{
			this._pointsDeVie--;

			if (this.estVivant())
				this.immuniser();
		}
		
	}

	/**
	 * Retire une munition au joueur
	 */
	tirer()
	{
		if (this.possedeMunitions())
			this._munitions--;
	}

	/**
	 * Ajoute une munition au joueur
	 */
	donnerMunition()
	{
		this._munitions++;
	}

	/**
	 * Indique si le joueur possède des munitions
	 */
	possedeMunitions()
	{
		return this._munitions > 0;
	}

	/**
	 * Indique si le joueur est vivant (lui reste-t-il des points de vie ?)
	 */
	estVivant()
	{
		return this._pointsDeVie > 0;
	}

	/**
	 * Indique si le joueur est invulnérable
	 */
	estImmunise()
	{
		return this._immunise;
	}
}