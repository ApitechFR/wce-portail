import { useState, MouseEventHandler, MouseEvent, useRef, useEffect, FormEvent } from 'react';
import styles from './HomeJoona.module.css';
import Input from '@codegouvfr/react-dsfr/Input';
import Button from '@codegouvfr/react-dsfr/Button';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useNavigate } from 'react-router-dom';
import RandExp from 'randexp';

interface AuthModalProps {
  roomName: string;
  email: string;
  isWhitelisted: boolean | null;
  setEmail: (mail: string) => void;
  sendEmail: (mail: string) => void;
  setIsWhitelisted: (e: any) => void;
  setRoomName: (e: any) => void;
  joinConference: (e: any) => void;
  authenticated: boolean | null;
  conferenceNumber: number;
  participantNumber: number;
}

function HomeJoona(props: AuthModalProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  
  useEffect(() => {
    setIsError(!isValidRoomName(props.roomName));
  }, [])

  const regexPattern = import.meta.env.VITE_CONFERENCE_NAME_REGEX ?? '^[A-Z0-9]{8}$';
  const regexName = new RegExp(regexPattern);

  function isValidRoomName(name: string): boolean {
    return regexName.test(name);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!props.roomName || !isValidRoomName(props.roomName)) {
      setIsError(true)
      return
    };
    setIsError(false);
    props.setRoomName(props.roomName);
    navigate(`/${props.roomName}`);
  }

  function generateRoomName() {
    const name = new RandExp(regexName).gen();
    console.log({regexName});
    return name;
  }
  return (
    <div className={styles.homeContainer}>
      <div className={styles.firstContainer}>
        <h1 className={styles.homeTitle}>Rejoindre une visio conférence</h1>
        <div style={{ width: '70%', margin: 'auto' }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <Input
              label=""
              id="conferenceName"
              state={isError && isFocused ? 'error' : 'default'}
              nativeInputProps={{
                placeholder: 'Saisissez votre nom de conférence',
                value: props.roomName,
                onChange: (e) => {
                  const value = e.currentTarget.value;
                  props.setRoomName(value);
                  setIsError(!isValidRoomName(value));
                },
                onFocus: () => setIsFocused(true),
                onBlur: () => setIsFocused(false),
                ref: inputRef,
              }}
              stateRelatedMessage={
                isError && isFocused && import.meta.env.VITE_CONFERENCE_NAME_REGEX_MESSAGE
              }
              style={{ width: '100%' }}
            />
            <Button
              className={styles.plusButton}
              // onClick={generateRoomName}
              onClick={() => {
                const newName = generateRoomName();
                props.setRoomName(newName);
                setIsError(!isValidRoomName(newName));
              }}
              type="button"
            >
              <ShuffleIcon />
            </Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Button
              // disabled={isError || !props.roomName}
              disabled={!isValidRoomName(props.roomName)}
              onClick={(e) => onSubmit(e)}
              className={styles.joinButton}
            >
              <span>Rejoindre ou créer</span>
            </Button>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              {/* <Button
                iconId="fr-icon-settings-5-line fr-btn--icon-right"
                onClick={function noRefCheck(){}}
                priority="tertiary"
              >
                Tester votre matériel
              </Button> */}
              <Button
                onClick={function noRefCheck() { }}
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
