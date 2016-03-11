/**
 * Retourne l'angle en degres formé par trois points
 */
function getAngle3Points(centre, debut, fin)
{
	if (debut.getX() == centre.getX() && debut.getY() == centre.getY() || fin.getX() == centre.getX() && fin.getY() == centre.getY())
		return 0.0;

	var angleDebut = getAngle(centre, debut);
	var angleFin = getAngle(centre, fin);

	var valRet = angleFin - angleDebut;

	if (valRet < 0)
		valRet += 360;

	return valRet;
}

/**
 * Retourne l'angle en degres formé par l'axe horizontal pasant par (xOrigine ; yOrigine) et le point (xPoint ; yPoint)
 */
function getAngle(origine, point)
{
	var valRet = 0;

	var rayon = Math.sqrt(Math.pow(origine.getX() - point.getX(), 2) + Math.pow(origine.getY() - point.getY(), 2));

	valRet = (Math.asin(Math.abs(point.getY() - origine.getY()) / rayon)) / Math.PI * 180;

	if (point.getX() < origine.getX())
		valRet = 180 - valRet;

	if (point.getY() < origine.getY())
		valRet = 360 - valRet;

	return valRet;
}