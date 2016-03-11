"use strict";
/**
 * Représentation des coordonnées d'un point 2D
 */
class Point
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		this._x = 0;
		this._y = 0;
	}

	/**
	 * Setters
	 */
	setX(value) { this._x = value; }
	setY(value) { this._y = value; }
	setXY(valueX, valueY) { this._x = valueX; this._y = valueY; }

	/**
	 * Getters
	 */
	getX() { return this._x; }
	getY() { return this._y; }

	/**
	 * Copier le point donnée en paramètre
	 * @param point Point dont on souhaite copier les données
	 */
	copier(point)
	{
		this.setX(point.getX());
		this.setY(point.getY());
	}

	/**
	 * Effectue une rotation du point par rapport au centre donné
	 * @param center Coordonnées du centre de rotation
	 * @param angleRadians Angre de rotation à effectuer
	 */
	tourner(centre, angleRadians)
	{
		var x = this.getX() - centre.getX();
		var y = this.getY() - centre.getY();

		var newX = x * Math.cos(angleRadians) - y * Math.sin(angleRadians) + centre.getX();
		var newY = x * Math.sin(angleRadians) + y * Math.cos(angleRadians) + centre.getY();

		this.setXY(newX, newY);
	}
}