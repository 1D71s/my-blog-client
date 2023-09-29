import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import {
  Group,
  MiniInfoCell,
  Text
} from "@vkontakte/vkui";
import {  Icon20BasketballOutline, Icon20EducationOutline, Icon20WorkOutline, Icon20ArticleBoxOutline, Icon20BubbleLolOutline  } from '@vkontakte/icons';


export interface User {
  fullInfo: {
    university?: string;
    job?: string;
    hobby?: string;
    about?: string;
  };
}

const UserFullInfo = () => {

  const [user, setUser] = useState<User>({ fullInfo: {} }) 
  const { id } = useParams()

  const getUser = async () => {
    try {
      const { data } = await axios.get(`user/fullinfo/${id}`)
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(user)

  useEffect(() => {
    getUser()
  }, [id])

  return (
    <Group>
      {user?.fullInfo?.university && (
        <div>
          <MiniInfoCell before={<Icon20EducationOutline />}>
            University:
          </MiniInfoCell>
          <Text style={{marginLeft: '50px', marginBottom: '10px'}}>
              {user?.fullInfo.university}
          </Text>
        </div>
      )}

      {user?.fullInfo?.job && (
        <div>
          <MiniInfoCell before={<Icon20WorkOutline />}>
            Job:
          </MiniInfoCell>
          <Text style={{marginLeft: '50px', marginBottom: '10px'}}>
              {user?.fullInfo.job}
          </Text>
        </div>
      )}

      {user?.fullInfo?.hobby && (
        <div>
          <MiniInfoCell before={<Icon20BasketballOutline />}>
            Hobby:
          </MiniInfoCell>
          <Text style={{marginLeft: '50px', marginBottom: '10px'}}>
              {user?.fullInfo.hobby}
          </Text>
        </div>
      )}

      {user?.fullInfo?.about && (
        <div>
          <MiniInfoCell before={<Icon20ArticleBoxOutline />}>
            About me:
          </MiniInfoCell>
          <Text style={{marginLeft: '50px', marginBottom: '10px'}}>
              {user?.fullInfo.about}
          </Text>
        </div>
      )}
      {!user?.fullInfo?.university && !user?.fullInfo?.job && !user?.fullInfo?.hobby && !user?.fullInfo?.about && (
        <MiniInfoCell before={<Icon20BubbleLolOutline />}>
          <div>info is empty</div>
        </MiniInfoCell>
      )}

    </Group>
  );
  
}

export { UserFullInfo }
