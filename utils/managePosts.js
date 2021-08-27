const sortPostsBy = (posts, sortBy, direction = "asc") => {
    if (direction === "desc") {
        posts = posts.sort((a, b) => (b[sortBy] > a[sortBy]) ? 1 : -1);
    } else {
        posts = posts.sort((a, b) => (b[sortBy] < a[sortBy]) ? 1 : -1);
    }
    return posts;
}

const unique = (posts) => {
    let result = posts.filter(function({id}) {
        return !this.has(id) && this.add(id);
      }, new Set)   
    return result;
}

module.exports = {sortPostsBy, unique}
