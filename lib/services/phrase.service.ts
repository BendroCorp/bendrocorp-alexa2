export class PhraseService
{
    private randomQuip = [
    "As a reminder...never approach another ship at cruise speed. Don't pull a \"Trap\". ",
    "Remember service equals citiz...- yeah I'm not going to say that. ",
    "Director El-trap would like to remind everyone that the complaint department is in trash compactor H 12. ",
    "Remember unsecured cargo is deadly cargo! ",
    "Help make space safe. Submit an offender report today - for an actual offender - not your mother... ",
    "Remember some people should never be trusted with a well armored ship...or fire...",
    "Remember that mining lasers are lasers - they should not be aimed at anything you do not intend to 'mine'",
    "As a reminder, boarding a system security station is a crime - so you shouldn't do it. Really do not do it...",
    "Remember that recommended landing speed is 10 meters per second. Not 150.",
    "As a reminder, just because you can ram a ship into something does not mean that you should. Ever."
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