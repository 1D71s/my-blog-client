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
} from "@vkontakte/vkui";
import {
  Icon28NewsfeedOutline,
  Icon24DoorArrowLeftOutline,
  Icon24UserAddOutline,
  Icon24Write,
  Icon28UserCircleOutline,
  Icon24DoorArrowRightOutline
} from "@vkontakte/icons";
import { useNavigate } from "react-router-dom";
import "./LayoutComponent.css"
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../redux/userSlice';
import { NavBar } from '../NavBar/NavBar';


interface ExampleProps {
    Content: React.ReactNode;
}

const Example: React.FC<ExampleProps> = ({ Content }) => {
      
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const [activeStory, setActiveStory] = React.useState('profile');

  const isAuthUser = useAppSelector(state => state.auth.token);
    
  const theme = useAppSelector(state => state.auth.theme)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logOutAccount = () => {
      dispatch(logOut())
      navigate('/login')
      window.localStorage.removeItem('token')
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
            {isAuthUser ? <Group>
              <div
                data-story="/"
                onClick={onStoryChange}
                className='menu-item'
              >
                <Icon28NewsfeedOutline className='menu-icons'/>
                <span>feed</span>
              </div>
              <div
                data-story="me"
                onClick={onStoryChange}
                className='menu-item'
              >
                <Icon28UserCircleOutline className='menu-icons'/>
                <span>profile</span>
              </div>
              <div
                data-story="create"
                onClick={onStoryChange}
                className='menu-item'
              >
                <Icon24Write className='menu-icons'/>
                <span>create post</span>
              </div>
              <div
                data-story="create"
                onClick={logOutAccount}
                className='menu-item'
              >
                <Icon24DoorArrowRightOutline className='menu-icons'/>
                <span>log out</span>
              </div> 
            </Group> :
            <Group>
                <div
                data-story="login"
                onClick={onStoryChange}
                className='menu-item'
              >
                <Icon24DoorArrowLeftOutline className='menu-icons'/>
                <span>sign in</span>
              </div>
              <div
                data-story="register"
                onClick={onStoryChange}
                className='menu-item'
              >
                <Icon24UserAddOutline className='menu-icons'/>
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
                  <Icon28NewsfeedOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  data-story="me"
                  text="Profile"
                >
                  <Icon28UserCircleOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  data-story="create"
                  text="Create"
                >
                  <Icon24Write />
                </TabbarItem>
                <TabbarItem
                  onClick={logOutAccount}
                  data-story="/"
                  text="Log Out"
                >
                  <Icon24DoorArrowRightOutline />
                </TabbarItem>

              </Tabbar> : 
              <Tabbar className={viewWidth.tabletMinus.className}>
                <TabbarItem
                  onClick={onStoryChange}
                  data-story="login"
                  text="Sign In"
                >
                  <Icon24DoorArrowLeftOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  data-story="register"
                  text="Sign Up"
                >
                  <Icon24UserAddOutline />
                </TabbarItem>
              </Tabbar>
            )
          }
        >
          
          <View id="profile" activePanel="profile">
            <Panel id="profile">
              <PanelHeader><NavBar/></PanelHeader>
              <Group style={{ height: 'max-content' }}>
                {Content}
              </Group>
            </Panel>
          </View>
                  
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
  
export default Example