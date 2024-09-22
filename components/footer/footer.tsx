import Link from 'next/link'
import style from './footer.module.css';
export default function Footer() {
    return (
     <div className={style.footer}>
        <div className={style.menu}>
            <Link className={style.option} href='/'>HOME</Link>
            <Link className={style.option} href='/portfolio'>PORTFOLIO</Link>
            <Link className={style.option} href='/studio'>STUDIO</Link>
            <Link className={style.option} href='/contact'>CONTACT</Link>
        </div>
        <span className={style.copyright}>All content Copyright © 2023 Sarah Yun</span>
     </div>
    )
  }