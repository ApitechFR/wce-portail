import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";

import styles from './Admin.module.css'

function Admin () {

    return (
        <div className={styles.content}>
            <Breadcrumb
                currentPageLabel="Administration"
                homeLinkProps={{
                    to: '/'
                }}
                segments={[]}
            />
            <div className={styles.titleBlock}>
                <h1>Administration</h1>
            </div>
            <div className={styles.inputSection}>
                
            </div>
        </div>
    )
}

export default Admin;