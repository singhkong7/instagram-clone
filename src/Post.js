import React from 'react'
import Avatar from "@material-ui/core/Avatar";
import "./Post.scss";
function Post({username,caption,image}) {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_header_avatar"
                    src="/static/images/avatar/1.jpg"
                    alt={username}
                />
                <h3>{username}</h3>
            </div>
            <img
                className="post_image"
                src={image}
                alt=" " 
            />
            <h4><strong>{username}:</strong>{caption}</h4>
        </div>
    )
}

export default Post
