const validTagSorts = {
    id: true,
    reads: true,
    likes: true,
    popularity: true
  };
const validDirectionSorts = {
    desc: true,
    asc: true
  };

const validateSortBy = (sortBy) => {
    return sortBy !== "" && (sortBy === undefined || validTagSorts[sortBy])
}

const validateDirection = (direction) => {
    return direction!== "" && (direction === undefined || validDirectionSorts[direction])
}

module.exports = {validateSortBy, validateDirection}
