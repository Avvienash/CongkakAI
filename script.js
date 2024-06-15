////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Global Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let animationSpeed, ResetButtonClicked, Player1Mode, Player2Mode, startPlayer;
let CURSOR = {
    pressed: false,
    x: 0,
    y: 0
};

const base_color = '#1d3f58';
const player_1_color = '#ffcc00';
const player_2_color = '#ACECA1';
const marble_color = '#95B8D1';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CANVAS SETUP
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');
// Set canvas width and height to match its attributes
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Set the stadium dimensions
let stadiumWidth = 0.9 * canvas.width;
let stadiumHeight = stadiumWidth / 3.5;
let cornerRadius = stadiumHeight / 2;
let circleRadiusSpacing = (stadiumWidth - 2 * cornerRadius) / 14 ;
let circleRadius = circleRadiusSpacing * 0.9;
let stadiumX = (canvas.width - stadiumWidth) / 2;
let stadiumY = (canvas.height - stadiumHeight) / 2;
let houseRadius = cornerRadius * 0.5;
let marbleRadius = circleRadius / 5;

let circle_positions = [
    [stadiumX + cornerRadius + circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
    [stadiumX + cornerRadius + 3 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
    [stadiumX + cornerRadius + 5 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
    [stadiumX + cornerRadius + 7 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
    [stadiumX + cornerRadius + 9 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
    [stadiumX + cornerRadius + 11 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
    [stadiumX + cornerRadius + 13 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],

    [stadiumX + stadiumWidth - cornerRadius / 1.75, stadiumY + stadiumHeight / 2],

    [stadiumX + cornerRadius + 13 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
    [stadiumX + cornerRadius + 11 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
    [stadiumX + cornerRadius + 9 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
    [stadiumX + cornerRadius + 7 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
    [stadiumX + cornerRadius + 5 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
    [stadiumX + cornerRadius + 3 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
    [stadiumX + cornerRadius + circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],

    [stadiumX + cornerRadius / 1.75, stadiumY + stadiumHeight / 2]
];

let circle_hovers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// Resize canvas
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx = canvas.getContext('2d');

    // Set the stadium dimensions
    stadiumWidth = 0.9 * canvas.width;
    stadiumHeight = stadiumWidth / 3.5;
    cornerRadius = stadiumHeight / 2;
    circleRadiusSpacing = (stadiumWidth - 2 * cornerRadius) / 14 ;
    circleRadius = circleRadiusSpacing * 0.9;
    stadiumX = (canvas.width - stadiumWidth) / 2;
    stadiumY = (canvas.height - stadiumHeight) / 2;
    houseRadius = cornerRadius * 0.5;
    marbleRadius = circleRadius / 5;

    circle_positions = [
        [stadiumX + cornerRadius + circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
        [stadiumX + cornerRadius + 3 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
        [stadiumX + cornerRadius + 5 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
        [stadiumX + cornerRadius + 7 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
        [stadiumX + cornerRadius + 9 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
        [stadiumX + cornerRadius + 11 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
        [stadiumX + cornerRadius + 13 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 - circleRadiusSpacing],
    
        [stadiumX + cornerRadius / 1.75, stadiumY + stadiumHeight / 2],
    
        [stadiumX + cornerRadius + 13 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
        [stadiumX + cornerRadius + 11 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
        [stadiumX + cornerRadius + 9 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
        [stadiumX + cornerRadius + 7 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
        [stadiumX + cornerRadius + 5 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
        [stadiumX + cornerRadius + 3 * circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
        [stadiumX + cornerRadius + circleRadiusSpacing, stadiumY + stadiumHeight / 2 + circleRadiusSpacing],
    
        [stadiumX + stadiumWidth - cornerRadius / 1.75, stadiumY + stadiumHeight / 2]
    ];
}
window.addEventListener('resize', resizeCanvas);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Event Listeners
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const Player1Select = document.getElementById('Player1Select');
    const Player2Select = document.getElementById('Player2Select');
    const animationSpeedSelect = document.getElementById('animationSpeedSelect');
    const reloadButton = document.getElementById('reloadButton');
    const startPlayerSelect = document.getElementById('startPlayerSelect');

    // Set default values
    animationSpeed = animationSpeedSelect.value;
    ResetButtonClicked = false;
    Player1Mode = Player1Select.value;
    Player2Mode = Player2Select.value;
    startPlayer = startPlayerSelect.value;

    console.log('Player 1 Mode:', Player1Mode);
    console.log('Player 2 Mode:', Player2Mode);
    console.log('Animation Speed:', animationSpeed);


    // Function to handle Player selection change
    Player1Select.addEventListener('change', () => {
        Player1Mode = Player1Select.value;
        console.log('Player 1 Mode:', Player1Mode);
    });
    
    Player2Select.addEventListener('change', () => {
        Player2Mode = Player2Select.value;
        console.log('Player 2 Mode:', Player2Mode);
    });

    // Function to handle animation speed selection change
    animationSpeedSelect.addEventListener('change', () => {
        animationSpeed = animationSpeedSelect.value;
        console.log('Animation Speed:', animationSpeed);
    });

    // Function to handle reset button click
    reloadButton.addEventListener('click', () => {
        ResetButtonClicked = true;
        console.log('Reset Button Clicked');
    });

    // Function to handle start player selection change
    startPlayerSelect.addEventListener('change', () => {
        startPlayer = startPlayerSelect.value;
        console.log('Start Player:', startPlayer);
    });

});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Draw Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function clearCanvas() 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Main Game 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Congkak
{
    constructor()
    {
        this.board = [7,7,7,7,7,7,7,0,7,7,7,7,7,7,7,0];
        this.marbles_selected_color = marble_color;

        // make copy of the board for display
        this.display_board = this.board.slice();
        this.display_board_array = [];
        this.current_circle = -1;
        
        
        this.display_text = 'Click Set Board to Begin';



        this.marbles_x_pos = [] //szie 98
        this.marbles_y_pos = [] //size 98
        this.marbles_circle = [] //size 98
        this.marbles_rank = [] //size 98      
        this.marbles_selected = [] //size 98
        
        
        this.next_player = -1;

        // Controls
        this.speed = 50;
        this.player = -1;
        this.player1_mode = 0;
        this.player2_mode = 0;

        this.move_single_new_x_pos = -1;
        this.move_single_new_y_pos = -1;
        this.move_single_marble_index = -1;
        this.move_single_vx = -1;
        this.move_single_vy = -1;
        this.move_single_steps = -1;
        this.single_moves = [];

    }

    initialisation_marbles()
    {
        transpositionTable = {};

        this.board = [7,7,7,7,7,7,7,0,7,7,7,7,7,7,7,0];
        this.display_text = 'Click Set Board to Begin';
        this.marbles_selected_color = marble_color;

        // make copy of the board for display
        this.display_board = this.board.slice();
        this.display_board_array = [];
        this.current_circle = -1;
        

        this.marbles_x_pos = [] //szie 98
        this.marbles_y_pos = [] //size 98
        this.marbles_circle = [] //size 98
        this.marbles_rank = [] //size 98      
        this.marbles_selected = [] //size 98
        
        
        this.next_player = -1;

        this.move_single_new_x_pos = -1;
        this.move_single_new_y_pos = -1;
        this.move_single_marble_index = -1;
        this.move_single_vx = -1;
        this.move_single_vy = -1;
        this.move_single_steps = -1;
        this.single_moves = [];

        /// Initialisation of the controls
        if (Player1Mode == 'user')
        {
            this.player1_mode = 0;
        }
        else if (Player1Mode == 'easy')
        {
            this.player1_mode = 1;
        }
        else if (Player1Mode == 'medium')
        {
            this.player1_mode = 2;
        }
        else if (Player1Mode == 'hard')
        {
            this.player1_mode = 3;
        }

        if (Player2Mode == 'user')
        {
            this.player2_mode = 0;
        }
        else if (Player2Mode == 'easy')
        {
            this.player2_mode = 1;
        }
        else if (Player2Mode == 'medium')
        {
            this.player2_mode = 2;
        }
        else if (Player2Mode == 'hard')
        {
            this.player2_mode = 3;
        }



        if (animationSpeed == 'slow')
        {
            this.speed = 10;
        }
        else if (animationSpeed == 'medium')
        {
            this.speed = 50;
        }
        else if (animationSpeed == 'fast')
        {
            this.speed = 100;
        }

        if (startPlayer == '1')
        {
            this.player = 1;
        }
        else if (startPlayer == '2')
        {
            this.player = 2;
        }
        console.log("Player Start", this.player);


        //// Initialisation of the marbles

        circle_positions.forEach((pos, index) => {
            let numMarbles = this.board[index];
            let rank = 0;
            let layer = 0;
            let drawnMarbles = 0;
            let marblesInLayer = 1;
            let angle_offset = 0;
            let radius_offset = 0;
    
            while (drawnMarbles < numMarbles) 
            {
                let marblesToDraw = Math.min(numMarbles - drawnMarbles, marblesInLayer);
    
                for (let i = 0; i < marblesToDraw; i++) {
                    let angle = (Math.PI * 2) / marblesInLayer * i + angle_offset;
                    let offsetX = Math.cos(angle) * (marbleRadius *radius_offset);
                    let offsetY = Math.sin(angle) * (marbleRadius *radius_offset);
                    rank = rank + 1;
                    this.marbles_x_pos.push(pos[0] + offsetX);
                    this.marbles_y_pos.push(pos[1] + offsetY);
                    this.marbles_circle.push(index);
                    this.marbles_rank.push(rank);
                    this.marbles_selected.push(0);
                }
    
                drawnMarbles += marblesToDraw;
                layer = layer + 1;
    
                if (layer % 6 === 1) 
                {
                    marblesInLayer = 6;
                    angle_offset = Math.PI / 6;
                    radius_offset = 2
                }
                else if (layer % 6 === 2) 
                {
                    marblesInLayer = 6;
                    angle_offset = 0;
                    radius_offset = 3.5;
                }
                else if (layer % 6 === 3) 
                {
                    marblesInLayer = 6;
                    angle_offset = Math.PI / 6;
                    radius_offset = 4;
                }
                else if (layer % 6 === 4) 
                {
                    marblesInLayer = 3;
                    angle_offset = 0;
                    radius_offset = 2;
                }
                else if (layer % 6 === 5) 
                {
                    marblesInLayer = 3;
                    angle_offset = Math.PI / 3;
                    radius_offset = 2;
                }
                else if (layer % 6 === 0) 
                {
                    marblesInLayer = 11;
                    angle_offset = Math.PI / 4;
                    radius_offset = 4;
                }    
            }
        });
    }

    draw_frame()
    {
                // Draw the stadium
        ctx.strokeStyle = base_color
        ctx.lineWidth = 4; // Set line width for better visibility
        ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Transparent fill
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.beginPath();

        // Start from top-left corner and draw clockwise
        ctx.moveTo(stadiumX + cornerRadius, stadiumY);
        ctx.lineTo(stadiumX + stadiumWidth - cornerRadius, stadiumY);
        ctx.arcTo(stadiumX + stadiumWidth, stadiumY, stadiumX + stadiumWidth, stadiumY + cornerRadius, cornerRadius);
        ctx.lineTo(stadiumX + stadiumWidth, stadiumY + stadiumHeight - cornerRadius);
        ctx.arcTo(stadiumX + stadiumWidth, stadiumY + stadiumHeight, stadiumX + stadiumWidth - cornerRadius, stadiumY + stadiumHeight, cornerRadius);
        ctx.lineTo(stadiumX + cornerRadius, stadiumY + stadiumHeight);
        ctx.arcTo(stadiumX, stadiumY + stadiumHeight, stadiumX, stadiumY + stadiumHeight - cornerRadius, cornerRadius);
        ctx.lineTo(stadiumX, stadiumY + cornerRadius);
        ctx.arcTo(stadiumX, stadiumY, stadiumX + cornerRadius, stadiumY, cornerRadius);

        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Stroke the stadium border
        // Draw the circles with numbers
        circle_positions.forEach((pos, index) => {

            let drawingRadius = circleRadius;   
            if (index == 7 || index == 15) {
                drawingRadius = houseRadius;
            }

            ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Transparent fill
            ctx.strokeStyle = base_color;
            if (circle_hovers[index] == 1) 
            {
                ctx.strokeStyle = player_1_color;
            }
            else if (circle_hovers[index] == 2)
            {
                ctx.strokeStyle = player_2_color;
            }
            
            ctx.beginPath();
            ctx.arc(pos[0], pos[1], drawingRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Draw the number above each circle
            // console.log(this.display_board);
            ctx.fillStyle = base_color; // Set text color
            if (circle_hovers[index] == 1) 
            {
                ctx.fillStyle = player_1_color;
            }
            else if (circle_hovers[index] == 2)
            {
                ctx.fillStyle = player_2_color;
            }

            if (index < 7) {
                ctx.fillText(this.display_board[index], pos[0], pos[1] - drawingRadius - 20);
            } else {
                ctx.fillText(this.display_board[index], pos[0], pos[1] + drawingRadius + 20);
            }
        }); 


        // Draw the Display Text
        ctx.fillStyle = base_color
        ctx.font = '30px Arial';
        ctx.fillText(this.display_text, canvas.width / 2, stadiumY-50);


    }

    draw_marbles(index = -1)
    {
        //ctx.fillStyle = '#ffcc00';
        ctx.strokeStyle = base_color;
        
        for (let i = 0; i < this.marbles_x_pos.length; i++) 
        {
            if (i == index)
            {
                continue;
            }

            ctx.fillStyle = marble_color;
            if ((circle_hovers[this.marbles_circle[i]] != 0  && ( this.current_circle == -1 || this.current_circle == this.marbles_circle[i] ))|| this.marbles_selected[i] == 1)
            {
                ctx.fillStyle = this.marbles_selected_color;
            }

            ctx.beginPath();
            ctx.arc(this.marbles_x_pos[i], this.marbles_y_pos[i], circleRadius / 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }

        if (index != -1)
        {
            ctx.fillStyle = marble_color;
            if (circle_hovers[this.marbles_circle[index]] != 0 || this.marbles_selected[index] == 1)
            {
                ctx.fillStyle = this.marbles_selected_color;
            }
            ctx.beginPath();
            ctx.arc(this.marbles_x_pos[index], this.marbles_y_pos[index], circleRadius / 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    }

    calculate_move_marble(circle_before, circle_after)
    {
        let marble_index =  -1;
        let marble_current_rank = 0;
        let marbles_new_rank = 1;
        for (let i = 0; i < this.marbles_circle.length; i++) 
        {
            if (this.marbles_circle[i] == circle_before) 
            {
                if (this.marbles_rank[i] > marble_current_rank) 
                {
                    marble_current_rank = this.marbles_rank[i];
                    marble_index = i;
                }
            }

            if (this.marbles_circle[i] == circle_after) 
            {
                marbles_new_rank = marbles_new_rank + 1;
            }
        }

        if (marble_index == -1) 
        {
            console.log("No marble to move");
            console.log("circle_before");
            console.log(circle_before);
            console.log("circle_after");
            console.log(circle_after);
            this.move_single_new_x_pos = -1;
            this.move_single_new_y_pos = -1;
            this.move_single_marble_index = -1;
            this.move_single_vx = -1;
            this.move_single_vy = -1;
            this.move_single_steps = -1;

            return
        }

        // console.log("marble_index");
        // console.log(marble_index);
        // console.log("marbles_new_rank");
        // console.log(marbles_new_rank);

        let numMarbles = marbles_new_rank;
        let rank = 0;
        let layer = 0;
        let drawnMarbles = 0;
        let marblesInLayer = 1;
        let angle_offset = 0;
        let radius_offset = 0;


        let new_x_pos = -1;
        let new_y_pos = -1;

        while (drawnMarbles < numMarbles) 
        {
            
            let marblesToDraw = Math.min(numMarbles - drawnMarbles, marblesInLayer);

            for (let i = 0; i < marblesToDraw; i++) {
                rank = rank + 1;
                if (rank == marbles_new_rank) 
                {

                    new_x_pos = circle_positions[circle_after][0] + Math.cos((Math.PI * 2) / marblesInLayer * i + angle_offset) * (marbleRadius * radius_offset);
                    new_y_pos = circle_positions[circle_after][1] + Math.sin((Math.PI * 2) / marblesInLayer * i + angle_offset) * (marbleRadius * radius_offset);
                    this.marbles_circle[marble_index] = circle_after;
                    this.marbles_rank[marble_index] = marbles_new_rank;
                }

            }

            drawnMarbles += marblesToDraw;
            layer = layer + 1;

            if (layer % 6 === 1) 
            {
                marblesInLayer = 6;
                angle_offset = Math.PI / 6;
                radius_offset = 2
            }
            else if (layer % 6 === 2) 
            {
                marblesInLayer = 6;
                angle_offset = 0;
                radius_offset = 3.5;
            }
            else if (layer % 6 === 3) 
            {
                marblesInLayer = 6;
                angle_offset = Math.PI / 6;
                radius_offset = 4;
            }
            else if (layer % 6 === 4) 
            {
                marblesInLayer = 3;
                angle_offset = 0;
                radius_offset = 2;
            }
            else if (layer % 6 === 5) 
            {
                marblesInLayer = 3;
                angle_offset = Math.PI / 3;
                radius_offset = 2;
            }
            else if (layer % 6 === 0) 
            {
                marblesInLayer = 11;
                angle_offset = Math.PI / 4;
                radius_offset = 4;
            }    
        }

        let dx = new_x_pos - this.marbles_x_pos[marble_index];
        let dy = new_y_pos - this.marbles_y_pos[marble_index];
        let distance = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx);
        let speed = this.speed
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;
        let steps = distance / speed;

        this.move_single_new_x_pos = new_x_pos;
        this.move_single_new_y_pos = new_y_pos;
        this.move_single_marble_index = marble_index;
        this.move_single_vx = vx;
        this.move_single_vy = vy;
        this.move_single_steps = steps;
        this.marbles_selected[marble_index] = 1;
        this.single_moves.shift();
        return
    }

    move_marble()
    {
        this.marbles_x_pos[this.move_single_marble_index] = this.marbles_x_pos[this.move_single_marble_index] + this.move_single_vx;
        this.marbles_y_pos[this.move_single_marble_index] = this.marbles_y_pos[this.move_single_marble_index] + this.move_single_vy;
        this.move_single_steps = this.move_single_steps - 1;

        if (this.move_single_steps <= 0)
        {
            this.marbles_x_pos[this.move_single_marble_index] = this.move_single_new_x_pos;
            this.marbles_y_pos[this.move_single_marble_index] = this.move_single_new_y_pos;

            this.move_single_new_x_pos = -1;
            this.move_single_new_y_pos = -1;
            this.move_single_marble_index = -1;
            this.move_single_vx = -1;
            this.move_single_vy = -1;
            this.move_single_steps = -1;

            this.display_board = this.display_board_array.shift();
        }
    
    }

    select_hole(hole)
    {
        let stones = this.board[hole];
        this.board[hole] = 0;
        this.current_circle = hole;

        if (this.player == 1 && hole > 6)
        {
            this.display_text = 'Invalid Move';
            console.log("Invalid Move");
        }
        else if (this.player == 2 && hole < 8)
        {
            this.display_text = 'Invalid Move';
            console.log("Invalid Move");
        }

        let i = hole;

        while (stones > 0)
        {
            i = i + 1
            if (this.player == 1 && i == 15)
            {
                i = i + 1;
            }

            if (this.player == 2 && i == 7)
            {
                i = i + 1;
            }

            i = i % 16;


            this.board[i] = this.board[i] + 1;
            stones = stones - 1;

            this.single_moves.push([hole, i]);
            let temp_board = this.board.slice();
            temp_board[hole] = stones;
            this.display_board_array.push(temp_board);

            if (stones == 0)
            {
                if (this.board[i] > 1 && i != 7 && i != 15)
                {
                    hole = i;
                    stones = this.board[i];

                    this.board[i] = 0;
                    console.log("hole");
                }
                else if (i == 7)
                {
                    this.next_player = 1;
                    return
                }
                else if (i == 15)
                {
                    this.next_player = 2;
                    return
                }
                else if (this.board[i] == 1)
                {
                    if (this.player == 1 && i < 7 && this.board[14-i] > 0)
                    {
                        while (this.board[14-i] > 0)
                        {
                            this.board[7] = this.board[7] + 1
                            this.board[14 - i] = this.board[14 - i] - 1;

                            this.display_board_array.push(this.board.slice());
                            this.single_moves.push([14-i, 7]);
                        }

                        this.board[7] = this.board[7] + 1
                        this.board[i] = 0;
                        this.display_board_array.push(this.board.slice());
                        this.single_moves.push([i, 7]);
                        
                    }
                    else if (this.player == 2 && i > 7 && this.board[14-i] > 0)
                    {
                        while (this.board[14-i] > 0)
                        {
                            this.board[15] = this.board[15] + 1
                            this.board[14 - i] = this.board[14 - i] - 1;

                            this.display_board_array.push(this.board.slice());
                            this.single_moves.push([14-i, 15]);
                        }

                        this.board[15] = this.board[15] + 1
                        this.board[i] = 0;
                        this.display_board_array.push(this.board.slice());
                        this.single_moves.push([i, 15]);

                    }
                    
                    this.next_player = (this.player == 1) ? 2 : 1;
                    return
                }


            }

            
        }

    }

    update()
    {
        transpositionTable = {};
        if (ResetButtonClicked)
        {
            ResetButtonClicked = false;
            this.initialisation_marbles();
            this.draw_frame();
            this.draw_marbles();
            return
        }
        else if (this.player == 1)
        {
            circle_hovers.fill(0);
            this.marbles_selected_color = marble_color;
            if (this.player1_mode == 0)
            {
                this.display_text = 'Player 1 Turn, Select a Hole';
                for (let i = 0; i < 7; i++)
                {
                    let distance = Math.sqrt((CURSOR.x - circle_positions[i][0]) * (CURSOR.x - circle_positions[i][0]) + (CURSOR.y - circle_positions[i][1]) * (CURSOR.y - circle_positions[i][1]));
                    if (distance < circleRadius)
                    {
                        circle_hovers[i] = 1;
                        this.marbles_selected_color = player_1_color;
                        break;
                    }
                }
            }
            else if (this.player1_mode == 1)
            {
                let worst_move = bestMoveMinmaxAlphaBetaPruningHash(this.board.slice(),this.player-1,6,1);
                circle_hovers[worst_move] = 1;
                this.select_hole(worst_move);
                this.display_text = 'Player 1 Selected Hole ' + worst_move;
                this.player = 0;
                this.marbles_selected_color = player_1_color;
                console.log("Computer 1 Depth -5");
            }
            else if (this.player1_mode == 2)
            {
                // get non empty holes
                let non_empty_holes = [];
                for (let i = 0; i < 7; i++)
                {
                    if (this.board[i] > 0)
                    {
                        non_empty_holes.push(i);
                    }
                }

                let random_hole = non_empty_holes[Math.floor(Math.random() * non_empty_holes.length)];
                circle_hovers[random_hole] = 1;
                this.select_hole(random_hole);
                this.player = 0;
                this.display_text = 'Player 1 Selected Hole ' + random_hole;
                this.marbles_selected_color = player_1_color;

                console.log("Computer 1 Random");
            }
            else if (this.player1_mode == 3)
            {
                let best_move = bestMoveMinmaxAlphaBetaPruningHash(this.board.slice(),this.player-1, 6,0);
                circle_hovers[best_move] = 1;
                this.select_hole(best_move);
                this.display_text = 'Player 1 Selected Hole ' + best_move;
                this.player = 0;
                this.marbles_selected_color = player_1_color;
                console.log("Computer 1 Depth 5");
            }
        }
        else if (this.player == 2)
        {
            circle_hovers.fill(0);
            this.marbles_selected_color = marble_color;
            if (this.player2_mode == 0)
            {
                this.display_text = 'Player 2 Turn, Select a Hole';
                for (let i = 8; i < 15; i++)
                {
                    let distance = Math.sqrt((CURSOR.x - circle_positions[i][0]) * (CURSOR.x - circle_positions[i][0]) + (CURSOR.y - circle_positions[i][1]) * (CURSOR.y - circle_positions[i][1]));
                    if (distance < circleRadius)
                    {
                        circle_hovers[i] = 2;
                        this.marbles_selected_color = player_2_color;
                        break;
                    }
                }
            }
            else if (this.player2_mode == 1)
            {
                let worst_move = bestMoveMinmaxAlphaBetaPruningHash(this.board.slice(),this.player-1, 6,1);
                circle_hovers[worst_move] = 2;
                this.select_hole(worst_move);
                this.display_text = 'Player 2 Selected Hole ' + worst_move;
                this.player = 0;
                this.marbles_selected_color = player_2_color;
                console.log("Computer 2 Depth -5");
            }
            else if (this.player2_mode == 2)
            {
                let non_empty_holes = [];
                for (let i = 8; i < 15; i++)
                {
                    if (this.board[i] > 0)
                    {
                        non_empty_holes.push(i);
                    }
                }

                let random_hole = non_empty_holes[Math.floor(Math.random() * non_empty_holes.length)];
                circle_hovers[random_hole] = 2;
                this.select_hole(random_hole);
                this.player = 0;
                this.display_text = 'Player 2 Selected Hole ' + random_hole;
                this.marbles_selected_color = player_2_color;
                console.log("Computer 2 Random");
            }
            else if (this.player2_mode == 3)
            {
                let best_move = bestMoveMinmaxAlphaBetaPruningHash(this.board.slice(),this.player-1, 6,0);
                circle_hovers[best_move] = 2;
                this.select_hole(best_move);
                this.display_text = 'Player 2 Selected Hole ' + best_move;
                this.player = 0;
                this.marbles_selected_color = player_2_color;
                console.log("Computer 2 Depth 5");
            }
        }
        else if (this.player == 0)
        {

            if (this.move_single_new_x_pos != -1)
            {
                this.move_marble();
            }
            else if (this.single_moves.length > 0)
            {
                let move = this.single_moves[0];

                
                if (this.current_circle != move[0])
                {
                    this.current_circle = move[0];
                    this.marbles_selected.fill(0);
                    for (let i = 0; i < this.marbles_circle.length; i++) 
                        {
                            if (this.marbles_circle[i] == move[0]) 
                            {
                                this.marbles_selected[i] = 1;
                            }
                        }
                }
                
                this.calculate_move_marble(move[0], move[1]);

            }
            else
            {
                this.marbles_selected.fill(0);
                this.current_circle = -1;
                if (this.next_player == 1)
                {
                    if (this.board.slice(0,7).every((val, i, arr) => val === arr[0]))
                    {
                        this.player = 2
                    }
                    else
                    {
                        this.player = 1
                    }
                }
                else if (this.next_player == 2)
                {
                    if (this.board.slice(8,15).every((val, i, arr) => val === arr[0]))
                    {
                        this.player = 1
                    }
                    else
                    {
                        this.player = 2
                    }
                }

                this.game_over();
            }
        }

    
    }

    game_over()
    {
        if (this.board.slice(0,7).every((val, i, arr) => val === arr[0]) && this.board.slice(8,15).every((val, i, arr) => val === arr[0]))
        {
            
            console.log("Game Over");
            this.player = -1;
            circle_hovers.fill(0);
            if (this.board[7] > this.board[15])
            {
                this.display_text = 'Player 1 Wins';
                circle_hovers[7] = 1;
            }
            else if (this.board[7] < this.board[15])
            {
                this.display_text = 'Player 2 Wins';
                circle_hovers[15] = 2;
            }
            else
            {
                this.display_text = 'Draw';
                circle_hovers[7] = 1;
                circle_hovers[15] = 2;
            }

            this.selected_marbles = [];
            this.marbles_selected_color = marble_color;
        }
        
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MOUSE INTERACTION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function logButtons(e) 
{
    CURSOR.x = e.x - canvas.getBoundingClientRect().left;
    CURSOR.y = e.y - canvas.getBoundingClientRect().top;

    if (e.type == 'mousedown')
    {
        if (CURSOR.pressed == false)
        {
            for (let i = 0; i < 16; i++)
            {
                if (circle_hovers[i] != 0 && game.board[i] > 0)
                {
                    CURSOR.pressed = true;
                    if (i < 7 )
                    {
                        game.select_hole(i);
                        game.display_text = 'Player 1 Selected Hole ' + i;
                    }
                    else if (i > 7 && i < 15)
                    {
                        game.select_hole(i);
                        game.display_text = 'Player 2 Selected Hole ' + i;
                    }
                    game.player = 0;
                }
            }
        }
        
    }
    else
    {
        CURSOR.pressed = false;
    }
}

canvas.addEventListener("mouseup", logButtons);
canvas.addEventListener("mousedown", logButtons);
canvas.addEventListener('mousemove', logButtons);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Main Animation Loop
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let game = new Congkak();
game.initialisation_marbles();
game.draw_frame();
game.draw_marbles();


// frame rate
let set_fps = 60;  
let set_interval = 1000/set_fps;
function animate()
{
    game.update();

    clearCanvas();
    game.draw_frame();
    game.draw_marbles(game.move_single_marble_index);
    

    setTimeout(() => {
        requestAnimationFrame(animate);
      }, 1000 /set_fps);

}
requestAnimationFrame(animate);
