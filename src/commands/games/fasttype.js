const Discord = require('discord.js');
const ms = require('ms');

let timeLength = 50000;
module.exports = async (client, interaction, args) => {

    let liste = `Parce que nous étions perdus, nous avons dû revenir sur nos pas.
    Il est dans un boys band, ce qui n'a pas beaucoup de sens pour un serpent.
    Un canard mort ne vole pas en arrière.
    Ne fais pas pipi dans mon jardin et ne me dis pas que tu essaies d'aider mes plantes à pousser.
    Son cri a silencé les adolescents bruyants.
    Les membres de l'équipe étaient difficiles à distinguer car ils portaient tous leurs cheveux en queue de cheval.
    J'entends dire que Nancy est très jolie.
    Les colonies nudistes évitent les vêtements en feuille de figuier.
    Une chanson peut faire ou gâcher la journée de quelqu'un si elle l'affecte.
    Elle ne voyait aucun paradoxe à me demander de changer tout en voulant que je l'accepte telle qu'elle est.
    Le passe-temps préféré de mon oncle était de construire des voitures avec des nouilles.
    En fin de compte, il s'est rendu compte qu'il pouvait voir le son et entendre les mots.
    Veuillez chercher une recette de soupe au poulet sur Internet.
    Il n'a pas fallu longtemps à Gary pour détecter que les voleurs étaient des amateurs.
    Comment vous êtes-vous blessé ?
    Il était évident qu'elle était chaude, en sueur et fatiguée.
    Il semblait être perplexe de manière confuse.
    L'amour n'est pas comme la pizza.
    Il était toujours dangereux de conduire avec lui puisqu'il insistait pour que les cônes de sécurité soient un parcours de slalom.
    Alors qu'il attendait que la douche chauffe, il remarqua qu'il pouvait entendre l'eau changer de température.
    Salutations de la galaxie MACS0647-JD, ou ce que nous appelons chez nous.
    Le monde a beaucoup changé au cours des dix dernières années.
    En entrant dans l'église, il pouvait entendre la voix douce de quelqu'un chuchotant dans un téléphone portable.
    Maintenant je dois réfléchir à mon existence et me demander si je suis vraiment réel.
    Le temps d'hier était bon pour l'escalade.
    Les gaufres sont toujours meilleures sans fourmis de feu et puces.
    Nancy était fière de diriger un naufrage.
    Il était tellement préoccupé par le fait qu'il pouvait le faire qu'il a oublié de se demander s'il devait le faire.
    Si manger des omelettes à trois œufs provoque une prise de poids, les œufs de perruche sont un bon substitut.
    Je ne respecte personne qui ne peut pas faire la différence entre Pepsi et Coca.
    Il a trouvé la fin de l'arc-en-ciel et a été surpris de ce qu'il y a trouvé.
    Il se demandait pourquoi à 18 ans il était assez vieux pour partir à la guerre, mais pas assez vieux pour acheter des cigarettes.
    Elle vivait sur Monkey Jungle Road et cela semblait expliquer toute sa bizarrerie.
    Julie veut un mari parfait.
    Puis-je vous offrir quelque chose à boire ?
    Veuillez attendre à l'extérieur de la maison.
    Son fils a plaisanté en disant que les barres énergétiques n'étaient rien d'autre que des barres chocolatées pour adultes.
    Ma sœur aînée ressemble à ma mère.
    Le feuillage épais et les vignes entremêlées rendaient la randonnée presque impossible.
    Un joyau scintillant ne suffit pas.
    Trente ans plus tard, elle pensait encore qu'il était acceptable de mettre le rouleau de papier toilette sous plutôt que sur.
    Chaque personne qui vous connaît a une perception différente de qui vous êtes.
    Descendez les escaliers avec précaution.
    Confronté à sa plus grande peur, il a mangé son premier marshmallow.
    Elle pleurait des diamants.
    Demain apportera quelque chose de nouveau, alors laissez aujourd'hui comme un souvenir.
    Erin a accidentellement créé un nouvel univers.
    David adhère à la stratégie "fourrer la tente dans le sac" plutôt que de la plier soigneusement.
    La serveuse n'a pas été amusée lorsqu'il a commandé des œufs verts et du jambon.
    Tout ce que vous avez à faire est de prendre le stylo et de commencer.`;

    async function start() {
        const inGame = new Set();
        const filter = m => m.author.id === interaction.user.id;
        if (inGame.has(interaction.user.id)) return;
        inGame.add(interaction.user.id);
        var i;
        for (i = 0; i < 25; i++) {
            const time = Date.now();

            liste = liste.split("\n");
            let sentenceList = liste[Math.floor(Math.random() * liste.length)];

            let sentence = '';
            let ogSentence = sentenceList.toLowerCase().replace("    ", "");

            ogSentence.split(' ').forEach(argument => {
                sentence += '`' + argument.split('').join(' ') + '` '
            });

            await client.embed({
                title: `💬・FastType`,
                desc: `Tapez ce qui suit en ${ms(timeLength, { long: true })} ! \n${sentence}`,
                type: 'editreply'
            }, interaction)

            try {
                var msg = await interaction.channel.awaitMessages({
                    filter,
                    max: 1,
                    time: timeLength,
                    errors: ['time']
                });
            } catch (ex) {
                client.errNormal({
                    error: "Le temps est écoulé !",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break;
            }

            if (['annuler', 'fin'].includes(msg.first().content.toLowerCase().trim())) {
                msg.first().delete();
                client.succNormal({
                    text: "Terminé !",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break
            } else if (msg.first().content.toLowerCase().trim() === ogSentence.toLowerCase()) {
                msg.first().delete();
                client.succNormal({
                    text: `Vous avez réussi en ${ms(Date.now() - time, { long: true })} !`,
                    type: 'editreply'
                }, interaction)
                break;
            } else {
                client.errNormal({
                    error: "Malheureusement vous n'avez pas réussi !",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break;
            }

            if (i === 25) {
                client.succNormal({ text: `Vous avez réussi !`, type: 'editreply' }, interaction)
                inGame.delete(interaction.user.id)
                break
            }
        }
    }

    start()
}
