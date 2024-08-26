const allTickBoxes = document.querySelectorAll('.radio-btn')
const inputFields = document.querySelectorAll('.goal-input')
const toggleWarning = document.querySelector('.warning')
const valueForProgressBar = document.querySelector('.progress-value')


const allGoals = {
  
}

allTickBoxes.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    const checkFilled = [...inputFields].every((input) => input.value)

    if (checkFilled) {
      checkbox.parentElement.classList.toggle('completed')
      valueForProgressBar.style.width ='33.3%'
    }else{
      toggleWarning.style.visibility = 'visible'
    }
  })
})

inputFields.forEach((input)=>{
  input.addEventListener('focus',()=>{
    toggleWarning.style.visibility = 'hidden'
  })
  input.addEventListener('input',(e)=>{
    allGoals[input.id]= e.target.value
    console.log(allGoals);
  })
})