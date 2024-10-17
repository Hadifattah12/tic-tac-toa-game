export default function gameOver({winner,onRestart}){
    return (
    <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>it&apos;s draw!</p>}
        <p><button  onClick={onRestart}>Rematch!</button></p>
    </div>
    );
}