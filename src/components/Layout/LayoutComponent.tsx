import React, { useEffect } from 'react';
import {
  usePlatform,
  SplitLayout,
  PanelHeader,
  SplitCol,
  Panel,
  Group,
  View,
  Epic,
  Tabbar,
  TabbarItem,
  Platform,
  useAdaptivityConditionalRender,
  useAppearance,
  Counter
} from "@vkontakte/vkui";
import {
  Icon28NewsfeedOutline,
  Icon24DoorArrowLeftOutline,
  Icon24UserAddOutline,
  Icon28UserCircleOutline,
  Icon24DoorArrowRightOutline,
  Icon24UsersOutline,
  Icon24BookmarkCheckBadge,
  Icon24UserAdded,
  Icon24Search,
  Icon24MenuOutline,
  Icon28MessageOutline 
} from "@vkontakte/icons";
import { useNavigate } from "react-router-dom";
import "./LayoutComponent.css"
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { logOut } from '../../redux/userSlice';
import { NavBar } from '../NavBar/NavBar';
import { Icon28WriteSquareOutline } from '@vkontakte/icons';

interface ExampleProps {
    Content: React.ReactNode;
}

const Example: React.FC<ExampleProps> = ({ Content }) => {
      
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const [activeStory, setActiveStory] = React.useState('profile');

  const isAuthUser = useAppSelector(state => state.auth.token);
  const me = useAppSelector(state => state.auth.user);
  const countMessage = useAppSelector(state => state.auth.messages);

  const theme = useAppSelector(state => state.auth.theme)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const apperance = useAppearance()

  const leftMenu = {
    marginRight: '20px',
    color: apperance === 'light' ? '#0077FF' : '#71aaeb'
  }

  const bottomMenu = {
    color: apperance === 'light' ? '#0077FF' : '#71aaeb'
  }

  const logOutAccount = () => {
    dispatch(logOut())
    navigate('/login')
  }

  const onStoryChange = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(e.currentTarget.dataset.story || '');
  };
  const isVKCOM = platform !== Platform.VKCOM;
  
  useEffect(() => {
    document.body.style.background = (theme ? 'hsl(0, 0%, 95%)' : 'black');
  }, [theme]);
  
  return (
    <SplitLayout
      header={isVKCOM && <PanelHeader separator={false} />}
      style={{ justifyContent: 'center' }}
    >
      {viewWidth.tabletPlus && (
        <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
          <Panel>
            {isVKCOM && <PanelHeader />}
            {isAuthUser ? 
              <>
                <Group>
                  <div
                    data-story="/"
                    onClick={onStoryChange}
                    className='menu-item'
                  >
                    <Icon28NewsfeedOutline style={leftMenu}/>
                    <span>feed</span>
                  </div>
                  <div
                    data-story={`/user/${me?._id}`}
                    onClick={onStoryChange}
                    className='menu-item'
                  >
                    <Icon28UserCircleOutline style={leftMenu}/>
                    <span>profile</span>
                  </div>
                  
                  <div
                    data-story={`/messages/${me?._id}`}
                    onClick={onStoryChange}
                    className='menu-item-c'
                  >
                    <span style={{display: 'flex'}}>
                      <Icon28MessageOutline  style={leftMenu}/>
                      <span>direct</span>
                    </span>
                    {countMessage && countMessage > 0 ? <Counter mode='prominent'>
                      {countMessage} 
                    </Counter> : ''}
                  </div>
                  <div
                    data-story={`/user/following/${me?._id}`}
                    onClick={onStoryChange}
                    className='menu-item'
                  >
                    <Icon24UserAdded style={leftMenu}/>
                    <span>following</span>
                  </div>

                  <div
                    data-story={`/user/followers/${me?._id}`}
                    onClick={onStoryChange}
                    className='menu-item'
                  >
                    <Icon24UsersOutline style={leftMenu}/>
                    <span>followers</span>
                  </div>

                  <div
                    data-story={`/user/favorite/${me?._id}`}
                    onClick={onStoryChange}
                    className='menu-item'
                  >
                    <Icon24BookmarkCheckBadge style={leftMenu}/>
                    <span>favorite</span>
                  </div>

                  <div
                    data-story={`/search`}
                    onClick={onStoryChange}
                    className='menu-item'
                  >
                    <Icon24Search style={leftMenu}/>
                    <span>search</span>
                  </div>

                  <div
                    data-story="create"
                    onClick={onStoryChange}
                    className='menu-item'
                  >
                    <Icon28WriteSquareOutline style={leftMenu}/>
                    <span>create post</span>
                  </div>                
                </Group>
            
                <Group>
                  <div
                    data-story={`/user/settings/${me?._id}`}
                    onClick={onStoryChange}
                    className='menu-item'
                  >
                    <Icon24MenuOutline style={leftMenu}/>
                    <span>menu</span>
                  </div>
                  <div
                    onClick={logOutAccount}
                    className='menu-item'
                  >
                    <Icon24DoorArrowRightOutline style={leftMenu}/>
                    <span>log out</span>
                  </div>
                </Group>
              </>
              :

            <Group>
                <div
                data-story="login"
                onClick={onStoryChange}
                className='menu-item'
              >
                <Icon24DoorArrowLeftOutline style={leftMenu}/>
                <span>sign in</span>
              </div>
              <div
                data-story="register"
                onClick={onStoryChange}
                className='menu-item'
              >
                <Icon24UserAddOutline style={leftMenu}/>
                <span>sign up</span>
              </div>
            </Group>}
          </Panel>
        </SplitCol>
      )}

      <SplitCol width="100%" maxWidth="660px" stretchedOnMobile autoSpaced>
        <Epic
          activeStory={activeStory}
          tabbar={
            viewWidth.tabletMinus && (
              isAuthUser ? <Tabbar className={viewWidth.tabletMinus.className}>
                <TabbarItem
                  onClick={onStoryChange}
                  data-story="/"
                  text="Feed"
                >
                  <Icon28NewsfeedOutline style={bottomMenu}/>
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  data-story={`/user/${me?._id}`}
                  text="Profile"
                >
                  <Icon28UserCircleOutline style={bottomMenu}/>
                </TabbarItem>

                <TabbarItem
                  onClick={onStoryChange}
                  data-story={`/messages/${me?._id}`}
                  text="Direct"
                  indicator={
                    countMessage && countMessage > 0 ? <Counter size="s" mode="prominent">
                      {countMessage}
                    </Counter> : ''
                  }

                >
                  <Icon28MessageOutline  style={bottomMenu}/>
                </TabbarItem>

                <TabbarItem
                  onClick={onStoryChange}
                  data-story="create"
                  text="Create"
                >
                  <Icon28WriteSquareOutline style={bottomMenu}/>
                </TabbarItem>
                <TabbarItem
                  data-story={`/user/settings/${me?._id}`}
                  onClick={onStoryChange}
                  text="Menu"
                >
                  <Icon24MenuOutline style={bottomMenu}/>
                </TabbarItem>

              </Tabbar> : 
              <Tabbar className={viewWidth.tabletMinus.className}>
                <TabbarItem
                  onClick={onStoryChange}
                  data-story="login"
                  text="Sign In"
                >
                  <Icon24DoorArrowLeftOutline style={bottomMenu}/>
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  data-story="register"
                  text="Sign Up"
                >
                  <Icon24UserAddOutline style={bottomMenu}/>
                </TabbarItem>
              </Tabbar>
            )
          }
        >
          
          <View id="profile" activePanel="profile">
            <Panel id="profile">
              <PanelHeader><NavBar/></PanelHeader>
              <div style={{ height: 'max-content', paddingBottom: '20px'}}>
                {Content}
              </div>
            </Panel>
          </View>
                  
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
  
export default Example