import request from '../utils/request';

export const queryBookInfos = query => {
    return request({
        url: 'book/get/bookList',
        method: 'post',
        params: query
    });
};

export const editBookInfo = query => {
    return request({
        url: 'book/put/bookInfo',
        method: 'post',
        data: query
    });
};