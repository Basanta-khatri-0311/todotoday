const allTickBoxes = document.querySelectorAll('.radio-btn')
const inputFields = document.querySelectorAll('.goal-input')
const toggleWarning = document.querySelector('.warning')
const valueForProgressBar = document.querySelector('.progress-value')


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let goalsCount = Object.values(allGoals).filter((goals)=> goals.completed).length
valueForProgressBar.style.width =`${(goalsCount/3) * 100}%`
valueForProgressBar.firstElementChild.innerText = `${goalsCount}/3 completed`

allTickBoxes.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    const checkFilled = [...inputFields].every((input) => input.value)

    if (checkFilled) {
      checkbox.parentElement.classList.toggle('completed')
      allGoals[checkbox.nextElementSibling.id].completed = !allGoals[checkbox.nextElementSibling.id].completed
      goalsCount = Object.values(allGoals).filter((goals)=> goals.completed).length
      valueForProgressBar.style.width =`${(goalsCount/3) * 100}%`
      valueForProgressBar.firstElementChild.innerText = `${goalsCount}/3 completed`
      localStorage.setItem('allGoals', JSON.stringify(allGoals))
    }else{
      toggleWarning.style.visibility = 'visible'
    }
  })
})

inputFields.forEach((input)=>{
  input.value = allGoals[input.id].name

  if(allGoals[input.id].completed){
    input.parentElement.classList.add('completed')
  }

  input.addEventListener('focus',()=>{
    toggleWarning.style.visibility = 'hidden'
  })

  input.addEventListener('input',(e)=>{
    allGoals[input.id]= {
      name: e.target.value,
      completed: false
    }
    localStorage.setItem('allGoals', JSON.stringify(allGoals))
  })
})