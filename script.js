console.log(`Running`)
setTimeout(()=>{
    console.log(`Loaded`)
    const urlArr = window.location.href.split("/")
    const quizID = urlArr[urlArr.length-1]
    if(urlArr.includes("take")){
        console.log(`Quiz ID: ${quizID}`)
        console.log("Checking for past attempts")
        const dataStr = window.sessionStorage.getItem(`lol-${quizID}`)
        if(dataStr){
            console.log("Attempt found. Now populating...")
            const dataObj = JSON.parse(dataStr)
            for(let question of dataObj){
                const el = document.querySelector(`[name=${question.name}]`)
                el.value = question.val
                el.checked = question.checked
            }
            console.log("Done populating")
        }else{
            console.log("No past attempt found")
        }

        setInterval(()=>{
            window.sessionStorage.setItem(`lol-${quizID}`,JSON.stringify(
                [...document.getElementsByClassName("question_input")].map(el=>({name:el.name,val:el.value,checked:el.checked}))
            ))
            console.log("Saved quiz")
        },1000)
    }
},1000);