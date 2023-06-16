import fetch from 'node-fetch';

function getData(part) {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/' + part)
            .then(response => response.json())
            .then(json => {
                resolve({
                    data: json
                })
            })
    });
}

function handleUser(usersData, handsData) {
    return new Promise((resolve, reject) => {
        // console.log(usersData);
        const newUsersData = usersData.map((userData) => {
            const {id} = userData;

            const newHandsData = handsData.filter((handData) => handData.userId === id);

            return {
                ...userData,
                posts: newHandsData
            }
        });

        console.log(newUsersData)

        resolve({
            data: newUsersData
        });
    });
}

function handleComment(usersData, handsData) {
    return new Promise((resolve, reject) => {
        // console.log(usersData);
        const newUsersData = usersData.map((userData) => {
            const {posts} = userData;
            let comments = [];

            posts.map((post) => {
                const  {id} = post;
                const newHandsData = handsData.filter((handData) => handData.postId == id);
                comments = [
                    ...comments,
                    ...newHandsData
                ]
            });

            return {
                ...userData,
                comments: [
                    ...comments
                ]
            };
        });

        resolve({
            data: newUsersData
        });
    });
}

(async () => {
    const usersData = await getData('users');
    const postsData = await getData('posts');
    const commentsData = await getData('comments');
    const usersDataPosts = await handleUser(usersData.data, postsData.data);
    const usersDataFinal = await handleComment(usersDataPosts.data, commentsData.data);

    // requirement 2
        // console.log(usersDataFinal);

    // requirement 3
        // console.log(usersDataFinal);

    // requirement 4 Filter only users with more than 3 comments.
        // const  userCommentThree = usersDataFinal.data.filter((userData)=>{
        //     const {comments} = userData;
        //     return comments.length > 3;
        // });
        // console.log(userCommentThree);

    // requirement 5 Reformat the data with the count of comments and posts
        // const  usersReformat = usersDataFinal.data.map((userData)=> {
        //     const {comments, posts, ...newUserData} = userData;
        //     return {
        //         ...newUserData,
        //         commentsCount: comments.length,
        //         postsCount: posts.length
        //     };
        // });
        // console.log(usersReformat);

    // requirement 6: Who is the user with the most comments/posts?
        // demo
        // const usersDataFinal = [
        //     {id: 1, postsCount:30},
        //     {id: 2, postsCount:20},
        //     {id: 3, postsCount:50},
        //     {id: 4, postsCount:10},
        //     {id: 5, postsCount:40}
        // ];
        // const maxPost = usersDataFinal.reduce((preData, currentData) => {
        //     return (preData.postsCount > currentData.postsCount) ? preData : currentData
        // })
        // console.log(maxPost)
    // requirement 7: Sort the list of users by the postsCount value descending?
        // demo
        // const usersDataFinal = [
        //     {id: 1, postsCount:30},
        //     {id: 2, postsCount:20},
        //     {id: 3, postsCount:50},
        //     {id: 4, postsCount:10},
        //     {id: 5, postsCount:40}
        // ];
        // usersDataFinal.sort((a, b) => b.postsCount - a.postsCount)
        // console.log(usersDataFinal);

    // requirement 8: Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request. Merge the post data with format:
        // const post1Data = await getData('posts/1');
        // const commentForPost1Data = await getData('comments?postId=1');
        // const mergePost1Data = {
        //     ...post1Data.data,
        //     comments: commentForPost1Data.data
        // };
        // console.log(mergePost1Data)
})();
