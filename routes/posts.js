const express = require("express")
const router = express.Router()
const { fetchPostsByTag, fetchTagsPosts } = require("../utils/fetchPosts")
const { validateSortBy, validateDirection } = require("../utils/validateParams")
const { unique, sortPostsBy} = require("../utils/managePosts")
const { BadRequestError } = require("../handlers/errorHandler")
  
router.get("/", async (req, res, next) => {
    try {
        const { tags, sortBy, direction } = req.query;

        if(tags === undefined || tags === "") {
            throw new BadRequestError(`Tags parameter is required.`)
        } 

        if(!validateSortBy(sortBy)
        || !validateDirection(direction)) {
            throw new BadRequestError(`sortBy parameter is invalid.`)
        } 
        // Remove duplicate tags 
        const uniqTags = [...new Set(tags.split(","))]
        const postRequests = []
        
        // Sending concurrent requests to API
        uniqTags.map((tag) => {
            postRequests.push(fetchPostsByTag(tag))
        })
        
        const responses = await fetchTagsPosts(postRequests)
        const posts = []
        responses.map((response) => {
            posts.push(...response)
        })
        // Remove Duplicate Posts
        const uniquePosts = unique(posts)
        const sortByValue = sortBy ? sortBy : "id"
        // Sort Posts
        const sortedPosts = sortPostsBy(uniquePosts, sortByValue, direction)
        res.send(JSON.stringify( {"posts":sortedPosts} ) )

    } catch (err) {
      next(err)
    }
})

module.exports = router

