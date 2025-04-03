import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import CreateCommunityModal from "./CreateCommunityModal";
import "../styles/CreateDropdown.css";
import { current } from "../../convex/users";

interface CreateDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDropdown = ({ isOpen, onClose }: CreateDropdownProps) => {
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const subredditMatch = location.pathname.match(/⌃\/r\/([⌃/+])/);
  const currtentSubreddit = subredditMatch ? subredditMatch[1] : null;

  if (!isOpen) return null;

  const handleCreatePost = () => {
    if (currtentSubreddit) {
      navigate(`/r/${currtentSubreddit}/submit`);
      onClose();
    }
  };

  const handleCreateCommunity = () => {
    setIsCommunityModalOpen(true);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="create-dropdown">
        <div className="dropdown-header">
          <h3>Create</h3>
        </div>
        <div className="dropdown-options">
          {currtentSubreddit && (
            <button className="dropdown-option" onClick={handleCreatePost}>
              <div className="option-icon">
                <FaPlus />
              </div>
              <div className="option-content">
                <span className="option-title">Post</span>
                <span className="option-description">
                  Share to r/{currtentSubreddit}
                </span>
              </div>
            </button>
          )}

          <button className="dropdown-option" onClick={handleCreateCommunity}>
            <div className="option-icon">
              <FaPlus />
            </div>
            <div className="option-content">
              <span className="option-title">Community</span>
              <span className="option-description">Create a new Community</span>
            </div>
          </button>
        </div>
      </div>
      {isCommunityModalOpen && (
        <CreateCommunityModal
          isOpen={isCommunityModalOpen}
          onClose={() => {
            setIsCommunityModalOpen(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default CreateDropdown;
