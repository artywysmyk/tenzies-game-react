export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white" 
    }


    function generateNewSpan(){
        return <span className="dot"></span>
    }

    function createSpan(){
    const newSpan = []
    for(let i=0; i<props.value; i++){
      newSpan.push(generateNewSpan()
      )
    }
    return newSpan
  }

 
    
    return(

        <div 
        className={`die--${props.value} die-face`} 
        style={styles}
        onClick={props.holdDice}
        >

        {createSpan()}
        
        </div>
    )
}