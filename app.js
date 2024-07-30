Lenoir.setSections(24)

// HOME
function home() {
    let headingContent = new Section()
    let title = new Part(5, 14)
    title.appendComponent(new Component("header", "AI + Precision Nutrition Research", 1))
    headingContent.appendPart(title)
    headingContent.compile()

    let backgroundImgSrc = "bg.png"
    let landing = new Page("Mockup description", headingContent, "hero", backgroundImgSrc, 0.5, 0.01)

    ultra(landing,LenoirPrebuilts.verticalSpacer(1))

    let blogs = new Section()
    for (let i = 2; i < 22; i+=5) {
      let post = new Part(i, 5)
      post.appendComponent(new Component("markdown", `## Blog Post
Lorem ipsum`, 2))
      blogs.appendPart(post)
    }
    blogs.compile()
    landing.appendSection(blogs)
    
    ultra(landing,LenoirPrebuilts.verticalSpacer(1))

    Lenoir.registerPage("Home", landing, "index.html")
}
home()

var pages = {}
function randomPage(title) {
  pages[title]=null
  let headingContent = new Section()
  let tit = new Part(5, 14)
  tit.appendComponent(new Component("header", title, 1))
  headingContent.appendPart(tit)
  headingContent.compile()
  let landing = new Page("Mockup description", headingContent, "title")

  fetch(`markdown/${title.replaceAll("/","")}.md`)
  .then(
    x => x.text()
  )
  .then(
    y => {
      ultra(landing, LenoirPrebuilts.markdown(y))
      pages[title]=landing
      if (Object.values(pages).filter(x => x != null).length == 16) {

        for (pg of Object.keys(pages)) {
          Lenoir.registerPage(pg, pages[pg], pg.replaceAll("/","") + ".html")
        }

        Lenoir.setChildParent("About","T32 Program")
        Lenoir.setChildParent("Applications","T32 Program")
        Lenoir.setChildParent("Predoctoral","Curriculum")
        Lenoir.setChildParent("Post-doctoral","Curriculum")
        Lenoir.setChildParent("Faculty Mentors Handbook","Handbooks")
        Lenoir.setChildParent("Predoctoral Handbook","Handbooks")
        Lenoir.setChildParent("Post-doctoral Handbook","Handbooks")
        Lenoir.setChildParent("PIs","People")
        Lenoir.setChildParent("Faculty Mentors","People")
        Lenoir.setChildParent("Trainees","People")

        Lenoir.load("AI x PNR", favicon=null, faviconInNav = false)
      }
    }
  )
}
randomPage("T32 Program", 0)
randomPage("Curriculum", 1)
randomPage("Handbooks", 2)
randomPage("People", 3)
randomPage("News/Events", 4)
randomPage("Contact", 5)
randomPage("About", "0a")
randomPage("Applications", "0b")
randomPage("Predoctoral", "1a")
randomPage("Post-doctoral", "1b")
randomPage("Faculty Mentors Handbook", "2a")
randomPage("Predoctoral Handbook", "2b")
randomPage("Post-doctoral Handbook", "2c")
randomPage("PIs", "3a")
randomPage("Faculty Mentors", "3b")
randomPage("Trainees", "3c")

// Lenoir.bake("Lenoir")