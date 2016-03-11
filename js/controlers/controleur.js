"use strict";

/**
 * Controleur de l'application
 */
class Controleur extends Observateur
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super();

		//Vue principale de l'application
		this._vue = new Vue();

		//Gestion du jeu
		this._jeu = new Jeu(this);

		//Timer utilisé pour le refraichissement de l'écran
		this._timerRafraichissement = null;

		//Redimensionne la zone de dessin
		this.redimensionner();

		//Affiche l'écran de démarrage
		this._vue.afficherDebutPartie();
	}

	/**
	 * Fonction de notification appelée par les sujets du controleur
	 */
	notifier()
	{
		//Actualisation de la vue
		this._vue.actualiser(this._jeu);

		//Test permettant de savoir si le jeu est terminé ou s'il continue
		if(this._jeu.estTermine())
			this.terminerJeu();
	}

	/**
	 * Redimensionnement les éléments en fonction de la taille de l'écran
	 */
	redimensionner()
	{
		this._vue.redimensionner();
		this._jeu.setDimensionsPlateau(this._vue.getLargeurDessin(), this._vue.getHauteurDessin());
	}

	/**
	 * Démarre une nouvelle partie
	 */
	commencerNouveauJeu()
	{
		this._vue.masquerBandeaux();
		this._jeu.nouveau();
		this.animer();
	}

	/**
	 * Poursuit la partie sur un nouveau niveau
	 */
	commencerNiveauSuivant()
	{
		this._vue.masquerBandeaux();
		this._jeu.niveauSuivant();
		this.animer();
	}

	/**
	 * Termine le niveau en cours
	 */
	terminerJeu()
	{
		clearTimeout(this._timerRafraichissement);

		//Gestion de l'affichage en fonction de la manière dont s'est terminé le niveau (gain ou perte)
		if (this._jeu.estGagne())
			this._vue.afficherPartieGagnee();
		else
			this._vue.afficherPartiePerdue();
	}

	/**
	 * Rafraichissement du jeu toutes les 40 milisecondes
	 */
	animer()
	{
		this._jeu.animer();

		if(!this._jeu.estTermine())
			this._timerRafraichissement = setTimeout(function () { controleur.animer(); }, 40);
	}

	/**
	 * Gestionnaire d'événement appelé lorsque l'utilisateur clique sur le canvas
	 */
	onMouseDown()
	{
		if(!this._jeu.estTermine())
			this._jeu.tirer();
	}


	/**
	 * Gestionnaire d'événement appelé lorsque l'utilisateur bouge la souris au dessus du canvas
	 */
	onMouseMove(coordonnees)
	{
		if (!this._jeu.estTermine())
			this._jeu.orienterJoueurVers(coordonnees);
	}
}