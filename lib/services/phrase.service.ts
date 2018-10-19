export class PhraseService
{
    private randomQuip = [
    "As a reminder...never approach another ship at cruise speed. Don't pull a \"Trap\". ",
    "Remember service equals citiz...- yeah I'm not going to say that. ",
    "Director El-trap would like to remind everyone that the complaint department is in trash compactor H. 12. ",
    "Remember unsecured cargo is deadly cargo! ",
    "Help make space safe. Submit an offender report today - for an actual offender - not your mother... ",
    "Remember some people should never be trusted with a well armored ship...or fire..."
    ];

    /**
     * Pick for me a random quip! :)
     * @returns Random quip
     */
    quipMe() : string
    {
        let i = 0;
        i = Math.floor(Math.random() * this.randomQuip.length);
        return(this.randomQuip[i]);
    }
}