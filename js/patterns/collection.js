"use strict";
/**
 * Gère une collection d'objets
 */
class Collection
{
	/**
	 * Constructeur
	 */
	constructor(type)
	{
		this._type = type;
		this._elements = [];
	}

	/**
	 * Vide la collection
	 */
	clear()
	{
		this._elements = [];
	}

	/**
	 * Retourne le nombre d'élément contenus dans la collection
	 */
	length()
	{
		return this._elements.length;
	}

	/**
	 * Ajoute un élément à la collection
	 */
	add(element)
	{
		if (this._type === undefined)
			throw 'Collection::add - Type is not configurated (' + typeof element + ' ?)';

		var type = typeof element;

		if (type !== this._type && element instanceof this._type === false)
			throw 'Collection::add - Incorrect type of element (' + type + ', ' + this._type + ' required).';

		this._elements.push(element);
	}

	/**
	 * Retourne un élément de la collection
	 */
	get(iElement)
	{
		if (iElement < 0 || iElement >= this.length())
			throw 'Collection::getByIndice - Index out of range (' + iElement + ', 0 - ' + this.length() + ').';

		return this._elements[iElement];
	}

	/**
	 * retire un élément de la collection
	 */
	remove(index)
	{
		if (index < 0 || index >= this.length())
			throw 'Collection::remove - Index out of range (' + index + ', 0 - ' + this.length() + ').';

		this._elements.splice(index, 1);
	}
}