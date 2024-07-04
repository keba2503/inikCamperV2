import React, {FC} from 'react';
import {Blog} from '@/data/types';


export interface PostCardMetaProps {
    className?: string;
    meta: Pick<Blog, 'createdAt'>;
    size?: 'large' | 'normal';
}

const PostCardMeta: FC<PostCardMetaProps> = ({
                                                 className = 'leading-none',
                                                 meta,
                                                 size = 'normal',
                                             }) => {
    const {createdAt} = meta;
    return (
        <div
            className={`nc-PostCardMeta inline-flex items-center text-neutral-800 dark:text-neutral-200 ${
                size === 'normal' ? 'text-sm' : 'text-base'
            } ${className}`}
            data-nc-id="PostCardMeta"
        >
      <span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
        {new Date(createdAt).toLocaleDateString()}
      </span>
        </div>
    );
};

export default PostCardMeta;
