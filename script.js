/* Animations */
const sliders = document.querySelectorAll('.slide-in')

const options = {
    threshold: 0,
    rootMargin: '0px 0px -200px 0px'
}

const appearOnScroll = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting){
            return
        }
        entry.target.classList.add('appear')
    })
},options)

sliders.forEach(slider=>{
    appearOnScroll.observe(slider)
})