import React, { useEffect, useState, useCallback } from 'react';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');
  const { axios } = useAppContext() || {}; // ✅ Prevent undefined context crash

  // ✅ useCallback to prevent ESLint dependency warning
  const fetchComments = useCallback(async () => {
    if (!axios) return;
    try {
      const { data } = await axios.get('/api/admin/comments');
      if (data.success) {
        setComments(data.comments || []);
      } else {
        toast.error(data.message || 'Failed to load comments.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong.');
    }
  }, [axios]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="flex-1 sm:pt-12 sm:pl-16 bg-blue-50/50 pt-5 px-5">
      <div className="flex items-center justify-between max-w-3xl">
        <h1 className="font-semibold text-lg">Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Approved' ? 'text-primary' : 'text-gray-700'
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter('Not Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comments
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) =>
                filter === 'Approved' ? comment.isApproved === true : comment.isApproved === false
              )
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id || index} // ✅ safe key
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>

        {comments.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-sm">No comments found.</div>
        )}
      </div>
    </div>
  );
};

export default Comments;
