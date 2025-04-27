
// Commissions entre et sortie en pourcentage
const comEntree=5/100;
const comSortie=4/100;

// Selection des id du formulaire
let prixNapo= document.getElementById('prixNapoleon');
let prixCroix= document.getElementById('prixCroixSuisse');
let prixPesos= document.getElementById('prixPesos');
let prixKruge= document.getElementById('prixKruge');
let prixGeorge= document.getElementById('prixGeorge');
const nbNapoleon= document.getElementById('nbNapo');
const nbCroixSuisse= document.getElementById('nbCroix');
const nb50Pesos= document.getElementById('nbPesos');
const nbKrugerran= document.getElementById('nbKruge');
const nbGeorgeV= document.getElementById('nbGeorge');

const boutonCalcul= document.getElementById('calcul');
const resultCalcul= document.getElementById('conteneur');
const resultat= document.getElementById('total');
const conteneurFieldset= document.getElementById('contenusResults');
const resultatFinal= document.getElementById('resultatFinal');
const btnReset=document.getElementById('reset');

// Valeurs temporaires de calcul
let booleen=0;
let diffAnnee=0;
let diffMois=0;
let tauxImpot=0;
let ancienPrixPieces=0;
let prixAchatAvecCom=0;
let nouveauPrixPieces=0;
let prixVenteAvecCom=0;
let prixComEntree=0;
let prixComSortie=0;
let prixTotalPieces=0;
let plusValueAvantImpot=0;
let prixImpot=0;
let poidsTotalPieces=0;
let beneficeNet=0;
let prixOnze=0;
let coursOnze;


// Poids en gramme dor des pieces
const poidsNapo = 5.806;
const poidsCroix = 5.806;
const poidsPesos = 37.5;
const poidsKruge = 31.103;
const poidsGeorges = 7.32;


// Recuperation de la valeur du cours de lonze en euros
async function getGoldPrice() {
    const url = 'https://api.metalpriceapi.com/v1/latest?api_key=8b10a5ee8659dfcaa58bc33ed7281946&base=XAU&currencies=EUR';

    try {
        const response = await fetch(url);
        const data = await response.json();
        coursOnze=parseFloat(data.rates.EUR);

        // Affichage de la valeur du cours actuel de l'onze
        const blocCours=document.getElementById('blocCoursOz');
        const coursOz=document.createElement('span');
        coursOz.textContent=` ${(coursOnze).toFixed(2)}€/Oz`;
        blocCours.appendChild(coursOz);

    } catch (error) {
        console.error('Erreur de connexion:', error);
    }
}
getGoldPrice();


boutonCalcul.addEventListener('click', function() {
    // verification quon a pas deja cliqué sue le bouton calcul sans avoir reseté
    if(booleen!=0){
        alert 
        return(0);
    }
    else {
        booleen++;


        // Recuperation de la date du jour et date d'achat
        const dateActuelle= new Date();
        const dateAchat= new Date(document.getElementById('date').value);

        // Controle d'input
        if(nbNapoleon.value!==''   &&  prixNapo.value==='')   {alert('Veuillez saisir la valeur du Napoleon'); return (0);}
        if(nbCroixSuisse.value!==''  &&  prixCroix.value==='')  {alert('Veuillez saisir la valeur de la Croix Suisse'); return (0);}
        if(nb50Pesos.value!==''  &&  prixPesos.value==='')  {alert('Veuillez saisir la valeur de la 50 pesos'); return (0);}
        if(nbKrugerran.value!==''  &&  prixKruge.value==='')  {alert('Veuillez saisir la valeur du Krugerrand'); return (0);}
        if(nbGeorgeV.value!=='' &&  prixGeorge.value==='') {alert('Veuillez saisir la valeur de la Georges V'); return (0);}
        if(nbNapoleon.value==='' && nbCroixSuisse.value==='' && nb50Pesos.value==='' && nbKrugerran.value==='' && nbGeorgeV.value==='') {
            alert('Veuillez completer le formulaire'); return(0);
        }
        if(dateAchat.value==='') {alert("Veuillez saisir la date d'achat de la (des) pièce(s) d'or" ); return (0);}

        else {
            // Mise a 0 des champs vides dans le formulaire
            prixNapo.defaultValue=0;
            prixCroix.defaultValue=0;
            prixGeorge.defaultValue=0;
            prixKruge.defaultValue=0;
            prixPesos.defaultValue=0;
            nbNapoleon.defaultValue=0;
            nbCroixSuisse.defaultValue=0;
            nb50Pesos.defaultValue=0;
            nbKrugerran.defaultValue=0;
            nbGeorgeV.defaultValue=0;

            // Calcul du temps de detention et par ricochet, le taux dimposition
            diffAnnee=dateActuelle.getFullYear()-dateAchat.getFullYear();
            diffMois=dateActuelle.getMonth()-dateAchat.getMonth();
            if (diffMois < 0) {
                diffAnnee -= 1;
                diffMois += 12;
            }
            if(diffAnnee<=3)       {tauxImpot=parseFloat((36.20/100).toFixed(4));}
            else if(diffAnnee<=4)  {tauxImpot=parseFloat((34.39/100).toFixed(4));}
            else if(diffAnnee<=5)  {tauxImpot=parseFloat((32.58/100).toFixed(4));}
            else if(diffAnnee<=6)  {tauxImpot=parseFloat((30.77/100).toFixed(4));}
            else if(diffAnnee<=7)  {tauxImpot=parseFloat((28.96/100).toFixed(4));}
            else if(diffAnnee<=8)  {tauxImpot=parseFloat((27.15/100).toFixed(4));}
            else if(diffAnnee<=9)  {tauxImpot=parseFloat((25.34/100).toFixed(4));}
            else if(diffAnnee<=10) {tauxImpot=parseFloat((23.53/100).toFixed(4));}
            else if(diffAnnee<=11) {tauxImpot=parseFloat((21.72/100).toFixed(4));}
            else if(diffAnnee<=12) {tauxImpot=parseFloat((19.91/100).toFixed(4));}
            else if(diffAnnee<=13) {tauxImpot=parseFloat((18.10/100).toFixed(4));}
            else if(diffAnnee<=14) {tauxImpot=parseFloat((16.29/100).toFixed(4));}
            else if(diffAnnee<=15) {tauxImpot=parseFloat((14.48/100).toFixed(4));}
            else if(diffAnnee<=16) {tauxImpot=parseFloat((12.67/100).toFixed(4));}
            else if(diffAnnee<=17) {tauxImpot=parseFloat((10.86/100).toFixed(4));}
            else if(diffAnnee<=18) {tauxImpot=parseFloat((9.05/100).toFixed(4));}
            else if(diffAnnee<=19) {tauxImpot=parseFloat((7.24/100).toFixed(4));}
            else if(diffAnnee<=20) {tauxImpot=parseFloat((5.43/100).toFixed(4));}
            else if(diffAnnee<=21) {tauxImpot=parseFloat((3.62/100).toFixed(4));}
            else if(diffAnnee<=22) {tauxImpot=parseFloat((1.81/100).toFixed(4));}
            else {tauxImpot=0};

            // 1- Calcul du poids en or de toutes les pieces cumulees
            poidsTotalPieces=parseFloat(((nbNapoleon.value*poidsNapo)+(nbCroixSuisse.value*poidsCroix)+(nb50Pesos.value*poidsPesos)+(nbKrugerran.value*poidsKruge)+(nbGeorgeV.value*poidsGeorges)).toFixed(3));

            // 1- Prix de lonze en euros
            prixOnze=parseFloat(coursOnze/31.1035);

            // 1- Prix des pieces sans comission et sans impot
            ancienPrixPieces = parseFloat((prixNapo.value*nbNapoleon.value)+(prixCroix.value*nbCroixSuisse.value)+(prixPesos.value*nb50Pesos.value)+(prixKruge.value*nbKrugerran.value)+(prixGeorge.value*nbGeorgeV.value));

            // 1- Prix de la commission dentree
            prixComEntree=parseFloat((ancienPrixPieces*comEntree).toFixed(2));
    
            // 1- Valeur totale des pieces en incluant la comission dentree
            prixTotalPieces=parseFloat(((ancienPrixPieces*comEntree)+ancienPrixPieces).toFixed(3));

            // 2- Prix des pieces aujourdhui
            nouveauPrixPieces=parseFloat((poidsTotalPieces*prixOnze).toFixed(3));

            // 3- Commission de sortie
            prixComSortie=parseFloat((nouveauPrixPieces*comSortie).toFixed(3));

            // 3- Prix des pieces apres la commission de vente
            prixVenteAvecCom=parseFloat((nouveauPrixPieces-prixComSortie).toFixed(3));

            // 4- Calcul de la plus value avant imposition
            plusValueAvantImpot=parseFloat((prixVenteAvecCom-prixTotalPieces).toFixed(3));

            // 5-Culcul de la plus value finale
            if (nouveauPrixPieces <= 5000) {
                // Plafond fiscal a 5000euros
                tauxImpot=0 
            };
            prixImpot=parseFloat((plusValueAvantImpot*(tauxImpot)).toFixed(3));

            // 5-Calcul du benefice final
            beneficeNet=parseFloat((plusValueAvantImpot-prixImpot).toFixed(2));

            // Affichage du temps de detention et de leurs valeurs au moment de lachat
            let prixPiecesAchetes=document.createElement('span');
            prixPiecesAchetes.textContent=(`Achat effectué il y a ${diffAnnee} an(s) et ${diffMois} mois au prix de : ${(parseFloat(ancienPrixPieces)).toFixed(2)}€`);
            prixPiecesAchetes.classList.add('saisieValeur');
            prixPiecesAchetes.setAttribute('id','prixPiecesAchetees')
            resultCalcul.appendChild(prixPiecesAchetes);

            // Affichage de la valeur de la commission d'achat
            let commissionAchat=document.createElement('span');
            commissionAchat.textContent=(`Prix commission d'achat avec un taux de ${comEntree*100}% : ${(parseFloat(prixComEntree)).toFixed(2)}€`);
            commissionAchat.classList.add('saisieValeur', 'topSeparateur');
            commissionAchat.setAttribute('id','comAchat');
            resultCalcul.appendChild(commissionAchat);

            // Affichage de la valeur de la commission de vente
            let commisionVente=document.createElement('span');
            commisionVente.textContent=`Prix commision de vente avec un taux de ${comSortie*100}% : ${(parseFloat(prixComSortie)).toFixed(2)}€`;
            commisionVente.classList.add('saisieValeur');
            commisionVente.setAttribute('id','comVente');
            resultCalcul.appendChild(commisionVente);

            // Affichage de la valeur de revente des pieces sans commission de vente
            let prixVente=document.createElement('span');
            prixVente.textContent=`Prix de vente (⚠ plafond fiscal maximun de 5000€) : ${parseFloat(nouveauPrixPieces.toFixed(2))}€`;
            prixVente.classList.add('saisieValeur', 'topSeparateur');
            prixVente.setAttribute('id','prixVente');
            resultCalcul.appendChild(prixVente);

            // Affichage de la valeur de l'impot
            let imposition=document.createElement('span');
            imposition.classList.add('saisieValeur');
            imposition.setAttribute('id','impot');

            if (parseFloat(nouveauPrixPieces.toFixed(2)) <= 5000) {  
                // Le prix de vente est inferieur ou egal au plafond fiscal
                imposition.textContent="Taux d'imposition de 0% : 0€";
                resultCalcul.appendChild(imposition);
            } else {  
                // Le prix de vente est superieur au plafond fiscal
                imposition.textContent=`Taux d'imposition de ${(tauxImpot*100).toFixed(2)}% : ${(parseFloat(prixImpot)).toFixed(2)}€`;
                resultCalcul.appendChild(imposition);
            }
            
            // Creation dune div contenant les 2 blocs du benefice final
            let derniereDiv= document.createElement('div');
            derniereDiv.setAttribute('id','derniereDiv');
            derniereDiv.classList.add('topSeparateur', 'topSeparateur');
            resultCalcul.appendChild(derniereDiv);

            // Affichage du benefice final
            let textBenef=document.createElement('span');
            textBenef.textContent=(`Bénéfice final : `);
            textBenef.classList.add('saisieValeur');
            textBenef.setAttribute('id','textBenef');
            derniereDiv.appendChild(textBenef);

            let benef=document.createElement('span');
            benef.textContent=`${(parseFloat(beneficeNet)).toFixed(2)}€`;
            benef.classList.add('policeGrasse');
            benef.setAttribute('id','benef');
            derniereDiv.appendChild(benef);


            btnReset.addEventListener('click', function () {
                // Suppression des valeurs du formulaire
                nbNapoleon.value="";
                nbCroixSuisse.value="";
                nb50Pesos.value="";
                nbKrugerran.value="";
                nbGeorgeV.value="";
                prixNapo.value="";
                prixCroix.value="";
                prixPesos.value="";
                prixKruge.value="";
                prixGeorge.value="";
                date.value="";
                booleen=0;

                // Suppression du tableau des resultats
                if (document.getElementById('valeurPiecesAchetees')!=null)
                    {document.getElementById('valeurPiecesAchetees').remove();}

                if (document.getElementById('comAchat')!=null)
                    {document.getElementById('comAchat').remove();}

                if (document.getElementById('comVente')!=null)
                    {document.getElementById('comVente').remove();}

                if (document.getElementById('prixPiecesAchetees')!=null)
                    {document.getElementById('prixPiecesAchetees').remove();}

                if (document.getElementById('derniereDiv')!=null)
                    {document.getElementById('derniereDiv').remove();}

                if (document.getElementById('impot')!=null)
                    {document.getElementById('impot').remove();}

                if(document.getElementById('prixVente')!=null)
                    {document.getElementById('prixVente').remove();}
            });
        };
    }
});


