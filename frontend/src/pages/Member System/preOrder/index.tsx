import {useState} from 'react'
import { PiBasketFill } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import SidebarMemu from '../../../components/sidebarMember';
import MenuAll from './menu';
import AddMenuPreOrder from './addMenuPreOrder';
import EditPreOrder from './editPreOrder';
import './menuPreorder.css';
import Footer from '../../../components/footer';
export default function MenuPreorder() {
    const [addMenupop, setAddmenupop] = useState(false)
    const [basketMenupop, setBasketMenupop] = useState(false)
    return (
        <div className='menuPreorder'>
            <div className='sidebarMemu'>
                <SidebarMemu/>
            </div>
            <div className="contentMenu">
                <header>
                    <form className="search-menu">
                        <label htmlFor="">
                            <IoSearch className='icon-search'/>
                            <input className="search-input" placeholder='search for menu' />
                            <button className="search-btn">search</button>
                        </label>
                    </form>
                    <div className="basket-preorder" onClick={() => setAddmenupop(true)} ><PiBasketFill className="basket-icon"/></div>
                </header>
                <main>
                    <div className="menu-recomment">
                        <div className="menu-slide">
                            <div className="imge-slide">
                                <button className="bnt-laft"></button>
                                <div className="block-item"></div>
                                <button className="bnt-right"></button>
                            </div>
                            <div className="menu-name">
                                <p>129 bath.</p>
                                <span>Matchalatte & Orang</span>
                                <button onClick={() => setAddmenupop(true)}><span>+</span></button>
                            </div>
                        </div>
                        <div className="munu-slide-information">
                            <div className="information-text">Information</div>
                            <div className="imge-information"></div>
                            <div className="name-information">Matchalatte & Orang <span>ส้มส้ม</span></div>
                            <div className="cost-information">ราคา <span>129 bath.</span></div>
                            <div className="rating-information"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
                        </div>
                        <div className="munu-promotion">
                            <div className="information-text">Promotion & Recommend</div>
                            <div className="imges-promotion"></div>
                        </div>
                    </div>
                    <div className="menu-block">
                        <div className='menu-text'>Menu</div>
                            <MenuAll onAddmenupop={() => setAddmenupop(true)}/>
                        <br />
                    </div>
                </main>
                <footer>
                    <Footer/>
                </footer>
            </div>

            {addMenupop && <div className="add-menu">
                <AddMenuPreOrder onCloseAddmenupop={() => setAddmenupop(false)} />
            </div>}
            {basketMenupop && <div className="edit-basketes">
                <EditPreOrder onClosebasketMenupop={() => setBasketMenupop(false)} />
            </div>}
        </div>
  )
}
