
/*
NOTE:
Phaser 'State' objects each contain a member variable "game" that acts as
a reference to the current game. This can be handy!
 */


/*
Main class (Phaser.State implementation)

To be fed into Game class later on.
 */
class Main extends Phaser.State {

    /*
    preload()
    Phaser.State method override.

    This method is called first when a State object is 'started' in a Game context.
    It should only be used to load assets into the Loader and configure the display.
     */
    preload() {

        // DISPLAY CONFIG
        if(!this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setMinMax(this.game.width/2,
            this.game.height/2, this.game.width, this.game.height);
        }

        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        << set stage background colour >>
        << import assets >>
    }

    /*
    create()
    Phaser.State method override.

    This method is called after the preload is completed.
    It should be used to set up the initial state of the game, bringing in assets
    from the Loader and setting up any elements of the game that do not need to
    be changed dynamically.
     */
    create() {
        // Use Phaser's ARCADE physics engine.
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create a grouping for pipes sprites.
        this.pipes = this.game.add.group();

        //Add a row of pipes every time a fixed interval of time elapses.
        this.timer = this.game.time.events.loop(<...>);

        << add block sprite to game and enable physics on it, set it to experience gravity >>

        // New anchor position for the plane on the screen.
        this.plane.anchor.setTo(<<...>>);

        // Add keyboard event listener functionality.
        // The space bar should represent a jump.
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        << call jump() when space key is pressed >>

        // Initialize score variable and score counter on display.
        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

        // Add the jump sound.
        this.jumpSound = this.game.add.audio('jump');
        this.jumpSound.volume = 0.2;
    }

    /*
    update()
    Phaser.State method override.

    This method is called every frame once the state is running.
    It should be used for 'checking' and responding to dynamic aspects of the game,
    such as object collisions.
     */
    update() {
        
        << restartGame() if plane goes off display (too high or too low) >>

        << hitPipe() if plane or pipes overlap >>

        
    }

    // PSEUDO-CODE
    jump() {
        
        << do nothing if plane is dead >>
        << if plane is alive, make it jump>>

    }

    // PSEUDO-CODE
    hitPipe() {
        
        << do nothing (return) if plane is already dead >>

        // Prevent new pipes from appearing
        this.game.time.events.remove(this.timer);

        << go through every pipe in group 'pipes' and stop their movement >>
    }


    restartGame() {
        this.game.state.start('Main');
    }

    // PSEUDO-CODE
    addOnePipe(x, y) {
        var pipe = << pipe sprite added to game as preloaded pipe image>>

        << add pipe to 'pipes' group >>

        << enable pipe to have 'arcade' physics and give it negative velocity>>

        << kill pipe once it moves off display >>
    }

    // PSEUDO-CODE
    addRowOfPipes() {
        hole_index = <<random integer corresponding to index of pipe in a row [*]>>

        for (<<each block index, 'i'>>) {
            if (<<'i' is not hole index or hole index plus one>>)
                this.addOnePipe(<<x>>, <<y co-ord that depends on 'i'>>);

    }

    // [*]: Do not include the index of the final pipe, as our gap needs
    //      to be two pipes in height.

}



/*
Game class (Phaser.Game implementation)

Contains all of the information for our game to execute.
 */

// PSEUDO-CODE
class Game extends Phaser.Game {

    constructor(){
        super(<<...>>);

        << create new Main() object, add it as a state, then start it >>
    }
}

// Run the game!
// Can instantiate without a reference because we're in the global
// scope and hence it won't be destroyed.
new Game();