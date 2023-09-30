import { Link } from "react-router-dom";
import { useAdaptivityConditionalRender, PopoutWrapper, ModalDismissButton, CellButton } from '@vkontakte/vkui';
import { Author } from '../../types';
import { User } from '../../redux/userSlice';
import { BiBookmark, BiExpand } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";


type CustomPopoutProps = {
    onClose: () => void;
    remove: () => void;
    doFavorite: () => void;
    _id: string;
    author: Author,
    user: User | null,
  };

export const CustomPopout: React.FC<CustomPopoutProps> = ({ onClose, remove, doFavorite, _id, author, user }) => {
  

  const { sizeX } = useAdaptivityConditionalRender();
    return (
      <PopoutWrapper onClick={onClose}>
        <div
          style={{
            backgroundColor: 'var(--vkui--color_background_content)',
            borderRadius: 8,
            position: 'relative',
            padding: '20px',
          }}
        >
            <>
              <CellButton
                onClick={doFavorite}
                before={<BiBookmark style={{ width: '25px', height: '25px', margin: '15px 15px 15px 0' }}/>}
              >
                Add to my watch list
              </CellButton>
              {user && (user as any)._id === author._id && (
              <div>
                  <Link to={`/edit/${_id}`}>
                      <CellButton before={<BiExpand style={{width: '25px', height: '25px', margin: '15px 15px 15px 0'}}/>}>Edit post</CellButton>
                  </Link>
                  <CellButton onClick={() => remove()} before={<BiTrash style={{width: '25px', height: '25px', margin: '15px 15px 15px 0'}}/>} mode="danger">
                      Delete Post
                  </CellButton>
              </div>)}
                        
            </>
  
            {sizeX.regular && (
                <ModalDismissButton className={sizeX.regular.className} onClick={onClose} />
            )}
        </div>
      </PopoutWrapper>
    );
  };