import { useState, MouseEventHandler, MouseEvent } from 'react';
import styles from './HomeJoona.module.css';
import Input from '@codegouvfr/react-dsfr/Input';
import Button from '@codegouvfr/react-dsfr/Button';
import ShuffleIcon from '@mui/icons-material/Shuffle';

import roomNameGenerator from '../../../utils/RandomNameGenerator';

function HomeJoona() {

  const [roomName, setRoomName] = useState("");

  function generateRoomName() {
    setRoomName(roomNameGenerator());
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.firstContainer}>
        <h1 className={styles.homeTitle}>Rejoindre une visio conférence</h1>
        <div style={{width: '70%', margin: 'auto'}}>
          <div style={{display: 'flex', width: '100%'}}>
            <Input
              label=""
              nativeInputProps={{
                placeholder: 'Saisissez votre nom de conférence',
                value: roomName,
                onChange: (e) => setRoomName(e.target.value),
              }}
              style={{width: '100%'}}
            />
            <Button
              className={styles.plusButton}
              onClick={e => {
                e.preventDefault();
                generateRoomName();
                console.log("nom de conf généré", roomName)
              }}
              type="button"
            >
              <ShuffleIcon />
            </Button>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <Button
              disabled
              onClick={function noRefCheck(){}}
              className={styles.joinButton}
            >
              <span>Rejoindre ou créer</span>
            </Button>
            <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
              {/* <Button
                iconId="fr-icon-settings-5-line fr-btn--icon-right"
                onClick={function noRefCheck(){}}
                priority="tertiary"
              >
                Tester votre matériel
              </Button> */}
              <Button
                onClick={function noRefCheck(){}}
                priority="tertiary"
              >
                Copier le lien
                <i className="fr-icon-clipboard-line fr-btn--icon-right" aria-hidden="true"></i>
              </Button>
          </div>
          </div>
        </div>
      </div>
      <div className={styles.secondContainer}>
        <img src="" alt="test" />
      </div>
    </div>
  );
}

export default HomeJoona;
