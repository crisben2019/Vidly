import React from 'react';

const Like = (props) => {
   let { onClick, liked } = props;
   let className = liked ? 'fa fa-heart' : 'fa fa-heart-o';
   return <i className={className} style={{ cursor: "pointer" }} onClick={onClick} aria-hidden="true"></i>
};

export default Like;
