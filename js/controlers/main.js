"use strict";

var controleur = null;

/**
 * Démarrage de l'application
 */
function main()
{
	controleur = new Controleur();

	$(window).resize(function () { controleur.redimensionner(); });
}

$(window).load(main);