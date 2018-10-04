import React from 'react';

const Like = ({ onClick, liked }) => {
   let className = liked ? 'fa fa-heart' : 'fa fa-heart-o';
   return <i className={className} style={{ cursor: "pointer" }} onClick={onClick} aria-hidden="true"></i>
};

export default Like;
