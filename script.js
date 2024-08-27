const allTickBoxes = document.querySelectorAll('.radio-btn')
const inputFields = document.querySelectorAll('.goal-input')
const toggleWarning = document.querySelector('.warning')
const valueForProgressBar = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
const goalQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all goals , time to chill '
]
let goalsCount = Object.values(allGoals).filter((goals)=> goals.completed).length
valueForProgressBar.style.width =`${(goalsCount/3) * 100}%`
valueForProgressBar.firstElementChild.innerText = `${goalsCount}/3 completed`
progressLabel.innerText = goalQuotes[goalsCount]

allTickBoxes.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    const checkFilled = [...inputFields].every((input) => input.value)

    if (checkFilled) {
      checkbox.parentElement.classList.toggle('completed')
      allGoals[checkbox.nextElementSibling.id].completed = !allGoals[checkbox.nextElementSibling.id].completed
      goalsCount = Object.values(allGoals).filter((goals)=> goals.completed).length
      valueForProgressBar.style.width =`${(goalsCount/3) * 100}%`
      valueForProgressBar.firstElementChild.innerText = `${goalsCount}/3 completed`
      progressLabel.innerText = goalQuotes[goalsCount]
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
    if( allGoals[input.id].completed){
      input.value = allGoals[input.id].name
      return
    }

    allGoals[input.id]= {
      name: e.target.value,
      completed: false
    }
    localStorage.setItem('allGoals', JSON.stringify(allGoals))
  })
})