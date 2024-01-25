import IdeasApi from '../services/ideasApi';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];

    this.getIdeas();
  }

  addEventListeners() {
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();

        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteIdea(id) {
    try {
      // Delete from server
      const res = await IdeasApi.deleteIdea(id);
      //Delete from DOM
      this._ideas.filter((idea) => idea._id !== id);

      this.getIdeas();
    } catch (err) {
      console.log(err);
      alert('You can not delete this resource');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete">
                <i class="fas fa-times"></i>
              </button>`
            : '';
        return `
            <div class="card" data-id="${idea._id}">
            ${deleteBtn}
          <h3>
            ${idea.text}
          </h3>
          <p class="tag tag-${idea.tag.toLowerCase()}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
            `;
      })
      .join('');
    this.addEventListeners();
  }
}

export default IdeaList;
