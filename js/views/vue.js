"use strict";
/**
 * Vue associée au jeu
 */
class Vue
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		this._canvas = $('#canvas-dessin')[0];
		this._context = this._canvas.getContext('2d');

		$('#btnStart').bind('click', function () { controleur.commencerNouveauJeu(); });
		$('#btnReStart').bind('click', function () { controleur.commencerNouveauJeu(); });
		$('#btnNextLevel').bind('click', function () { controleur.commencerNiveauSuivant(); });
		
		$('#canvas-dessin').bind('mousemove', function (event)
		{
			var canvasPosition = $('#canvas-dessin').offset();

			var coordonnees = new Point();
			coordonnees.setXY(event.clientX - canvasPosition.left, event.clientY - canvasPosition.top + $(window).scrollTop());
			
			controleur.onMouseMove(coordonnees);
		});

		$('#canvas-dessin').bind('mousedown', function ()
		{
			controleur.onMouseDown();
		});
	}

	/**
	 * Retourne la largeur de la zone de dessin
	 */
	getLargeurDessin()
	{
		return this._canvas.width;
	}

	/**
	 * Retourne la hauteur de la zone de dessin
	 */
	getHauteurDessin()
	{
		return this._canvas.height;
	}

	/**
	 * Redimensionne les éléments de la page en fonction de la taille de la fenêtre
	 */
	redimensionner()
	{
		this._canvas.width = $('#canvas-dessin').width();
		this._canvas.height = $('#canvas-dessin').height();

		var marginTop = ($(window).height() - $('.bandeau').height()) / 2;
		$('.bandeau').css('margin-top', marginTop);
	}

	/**
	 * Affiche le calque de début de partie
	 */
	afficherDebutPartie()
	{
		$('#debut-partie').show();
	}

	/**
	 * Affiche le calque de fin de partie (perdue)
	 */
	afficherPartiePerdue()
	{
		$('#partie-perdue').show();
	}

	/**
	 * Affiche le calque de fin de niveau (gagné)
	 */
	afficherPartieGagnee()
	{
		$('#partie-gagnee').show();
	}

	/**
	 * Masque les calques
	 */
	masquerBandeaux()
	{
		$('#debut-partie').hide();
		$('#partie-gagnee').hide();
		$('#partie-perdue').hide();
	}

	/**
	 * Actualise l'affichage du jeu
	 */
	actualiser(jeu)
	{
		//Actualise le dessin du plateau de jeu
		jeu.dessiner(this._context);

		//Actualise les informations de partie
		this.actualiserNiveau(jeu.getNiveau());
		this.actualiserScore(jeu.getScore());
		this.actualiserPointsDeVie(jeu.getPointsDeVie());
		this.actualiserMunitions(jeu.getNombreMunitions());
	}

	/**
	 * Actualise le numéro du niveau
	 */
	actualiserNiveau(niveau)
	{
		$('#niveau').text('Niveau ' + (niveau + 1));
	}

	/**
	 * Actualise le score
	 */
	actualiserScore(score)
	{
		$('#score').text(score);
	}

	/**
	 * Actualise les points de vie du joueur
	 */
	actualiserPointsDeVie(score)
	{
		$('#points-de-vie').text(score);
	}

	/**
	 * Actualise les munitions du joueur
	 */
	actualiserMunitions(score)
	{
		$('#munitions').text(score);
	}
}