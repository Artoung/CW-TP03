"use strict";
/**
 * Classe Sujet (Pattern Sujet / Observateur)
 */
class Sujet
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		//Observateurs du sujet
		this._observateurs = [];
	}

	/**
	 * Ajoute un observateur au sujet
	 * @param observateur {Observateur} Observateur à ajouter au sujet
	 */
	ajouterObservateur(observateur)
	{
		this._observateurs.push(observateur);
	}

	/**
	 * Notifie les observateurs
	 */
	notifier()
	{
		for (var iObservateur in this._observateurs)
			this._observateurs[iObservateur].notifier();
	}
}