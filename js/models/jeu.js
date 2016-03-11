"use strict";
/**
 * Jeu "L'attaque des Pampmousses Mutants !"
 */
class Jeu extends Sujet
{
	/**
	 * Constructeur
	 */
	constructor(controleur)
	{
		super();
		this.ajouterObservateur(controleur);

		//Fabrique permettant de générer les différents éléments graphiques du jeu
		this._fabriqueElement = new FabriqueElement();

		//Liste des éléments graphiques présents sur le plateau
		this._elementsGraphiques = new ElementsGraphiques(this);

		//Elément graphique symbolisant le joueur
		this._joueur = null;

		//Indique que le niveau est terminé
		this._termine = true;

		//Indique le niveau est gagné
		this._gagne = false;

		//Indique le numéro du niveau en cours
		this._niveau = 0;

		//Indique le score du joueur
		this._score = 0;

		//Dimensions du plateau de jeu
		this._largeurPlateau = 0;
		this._hauteurPlateau = 0;

		//Timer plaçant régulièrement des bonus sur le plateau
		this._timerBonus = null;
	}

	/**
	 * Retourne le niveau auquel se trouve le joueur
	 */
	getNiveau()
	{
		return this._niveau;
	}

	/**
	 * Retourne le score du joueur
	 */
	getScore()
	{
		return this._score;
	}

	/**
	 * Retourne le nombre de munitions du joueur
	 */
	getNombreMunitions()
	{
		return this._joueur.getMunitions();
	}

	/**
	 * Retourne le nombre de points de vie du joueur
	 */
	getPointsDeVie()
	{
		return this._joueur.getPointsDeVie();
	}

	/**
	 * Définit les dimensions du plateau de jeu
	 */
	setDimensionsPlateau(largeur, hauteur)
	{
		this._largeurPlateau = largeur;
		this._hauteurPlateau = hauteur;
	}

	/**
	 * Indique si la partie est terminée
	 */
	estTermine()
	{
		return this._termine;
	}

	/**
	 * Indique si la joueur a gangé la manche
	 */
	estGagne()
	{
		return this._gagne;
	}

	/**
	 * Démarre une nouvelle partie
	 */
	nouveau()
	{
		this._termine = false;
		this._gagne = false;
		this._score = 0;
		this._niveau = 0;

		this.demarrerNiveau();
	}

	/**
	 * Passe au niveau suivant
	 */
	niveauSuivant()
	{
		this._termine = false;
		this._gagne = false;
		this._niveau++;
		this.demarrerNiveau();
	}

	/**
	 * Démarre le niveau
	 */
	demarrerNiveau()
	{
		//Suppression des précédents éléments graphiques
		this._elementsGraphiques.clear();		

		//Création du joueur
		this._joueur = this._fabriqueElement.create('humain');
		this._joueur.setXY(this._largeurPlateau / 2, this._hauteurPlateau / 2);
		this._joueur.immuniser();

		this._elementsGraphiques.add(this._joueur);

		//Création des pampmousses mutants initiaux en fonction du niveau
		var nombrePampmousses = 5 + this._niveau;

		for (var iPampmousse = 0; iPampmousse < nombrePampmousses; ++iPampmousse)
		{
			this.ajouterPampmousseMutant();
		}

		this.demarrerDistributionBonus();
	}

	/**
	 * Ajoute un élément graphique sur le plateau de jeu
	 */
	ajouterElement(element)
	{
		element.setXY(Math.floor(Math.random() * this._largeurPlateau), Math.floor(Math.random() * this._hauteurPlateau));

		this._elementsGraphiques.add(element);
	}

	/**
	 * Ajoute un pampmousse mutant sur le plateau de jeu
	 */
	ajouterPampmousseMutant()
	{
		//A faire : question 1
	}

	/**
	 * Ajoute une munition sur le plateau de jeu
	 */
	ajouterMunition()
	{
		this.ajouterElement(this._fabriqueElement.create('munition'));
	}

	/**
	 * Démarre la distribution aléatoire des munitions sur la plateau
	 */
	demarrerDistributionBonus()
	{
		var that = this;
		this._timerBonus = setTimeout(function ()
		{
			that.distribuerBonus();
		}, Math.floor(Math.random() * 2000) + 3000);
	}

	/**
	 * Ajoute une munition sur le plateau et prépare la prochaine distribution
	 */
	distribuerBonus()
	{
		this.ajouterMunition();
		this.demarrerDistributionBonus();
	}

	/**
	 * Oriente le joueur vers les coordonnées données
	 * @param coordonnees Coordonnées vers lequel on souhaite que le joueur se dirige
	 */
	orienterJoueurVers(coordonnees)
	{
		this._joueur.orienterVers(coordonnees);
	}

	/**
	 * Génère un tire du joueur
	 */
	tirer()
	{
		//Si le joueur possède des munitions
		if (this._joueur.possedeMunitions())
		{
			//On retire une munition au joueur
			this._joueur.tirer();

			//On place un presse-agrumes sur le plateau qui se déplace dans la même direction que le joueur
			var presseAgrumes = this._fabriqueElement.create('presse agrumes');
			presseAgrumes.setCoordonnees(this._joueur.getCoordonnees());
			presseAgrumes.setDirection(this._joueur.getDirection());

			this._elementsGraphiques.add(presseAgrumes);
		}		
	}

	/**
	 * Termine la partie
	 */
	terminer()
	{
		this._termine = true;

		clearTimeout(this._timerBonus);

		this.notifier();
	}

	/**
	 * Anime les éléments du jeu
	 */
	animer()
	{
		this._elementsGraphiques.animer(this._largeurPlateau, this._hauteurPlateau);

		this.gererCollissions();

		if (this._elementsGraphiques.getNombrePampmoussesMutants() == 0)
		{
			this._gagne = true;
			this.terminer();
		}

		this.notifier();
	}

	/**
	 * Gère les éventuelles collisions entre les éléments présents sur le plateau de jeu
	 */
	gererCollissions()
	{
		//Pour chaque éléments du plateau de jeu
		for(var iElement = 0; iElement < this._elementsGraphiques.length(); ++iElement)
		{
			var element = this._elementsGraphiques.get(iElement);

			if (element instanceof ElementMobile)
			{
				//Teste la collision des éléments avec les murs
				if (this.testerCollisionsMurs(element))
				{
					//Si un pampmousse mutant touche un mur, il change de direction
					if (element instanceof PampmousseMutant)
					{
						//A faire : question 3
					}
					else if (element instanceof PresseAgrumes)
					{
						//Si c'est un presse agrume, il est détruit
						this._elementsGraphiques.remove(iElement);
						--iElement;
					}
				}

				//Teste les collision entre éléments
				for (var iElement2 = 0; iElement2 < this._elementsGraphiques.length() ; ++iElement2)
				{
					var element2 = this._elementsGraphiques.get(iElement2);

					if (!(element2 instanceof PampmousseMutant) && !(element2 instanceof Munition))
						continue;

					//Si les deux éléments testés se touchent
					if (element.touche(element2))
					{
						//Si un humain touche...
						if (element instanceof Humain)
						{
							//... une munition
							if (element2 instanceof Munition)
							{
								//La munition est retirée du jeu
								this._elementsGraphiques.remove(iElement2);

								if (iElement2 < iElement)
									iElement--;

								--iElement2;

								//Le joueur reçoit une munition
								element.donnerMunition();
							}
							//... un pampmousse mutant
							else if (element2 instanceof (PampmousseMutant))
							{
								//A faire : question 5
							}
						}
						// Si un presse-agrumes touche un pampmousse mutant
						else if (element instanceof PresseAgrumes && element2 instanceof PampmousseMutant)
						{
							//A faire : question 6
						}
						//Si un pampmousse mutant touche une munition
						else if (element instanceof PampmousseMutant && element2 instanceof Munition)
						{
							//A faire : question 7
						}
					}
				}
			}
		}
	}

	/**
	 * Teste la collision d'un élément graphique du jeu avec les bords du plateau
	 * @element Elément du jeu que l'on souhaite tester
	 */
	testerCollisionsMurs(element)
	{
		var valRet = false;

		var coordonnees = element.getCoordonnees();

		//Test de collision avec les bords
		if (coordonnees.getX() > this._largeurPlateau || coordonnees.getX() < 0 || coordonnees.getY() > this._hauteurPlateau || coordonnees.getY() < 0)
		{
			if (coordonnees.getX() > this._largeurPlateau)
				coordonnees.setX(this._largeurPlateau);
			else if (coordonnees.getX() < 0)
				coordonnees.setX(0);

			if (coordonnees.getY() > this._hauteurPlateau)
				coordonnees.setY(this._hauteurPlateau);
			else if (coordonnees.getY() < 0)
				coordonnees.setY(0);

			valRet = true;
		}

		return valRet;
	}

	/**
	 * Dessine le plateau de jeu
	 */
	dessiner(context)
	{
		this.dessinerSol(context);
		this._elementsGraphiques.dessiner(context);
	}

	/**
	 * Dessine l'arrière plan du jeu
	 */
	dessinerSol(context)
	{
		var pattern = context.createPattern(textureSol, 'repeat');
		context.fillStyle = pattern;
		context.beginPath();
		context.rect(0, 0, this._largeurPlateau, this._hauteurPlateau);
		context.fill();
	}
}