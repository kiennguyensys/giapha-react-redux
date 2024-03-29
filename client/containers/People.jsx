import React, { Component } from 'react';
import { Box, Anchor, Grid, DropButton, Button, Heading, ThemeContext, Select} from 'grommet';
import { connect } from 'react-redux';
import Img from 'react-image'
import './styles/People.css';
import { Link } from 'react-router-dom';
import PersonCard from '../components/PersonCard';
// Remember our thunk this is where we will need to make use of it
import { fetchPeople, peopleFetchData, choosePerson, } from '../redux/actions/actions.js';
import ReactPaginate from 'react-paginate';
const Background = 'https://res.cloudinary.com/giaphatocphamphu/image/upload/v1563523660/phadobg.png'
class People extends Component {
    constructor(props){
        super(props)
        this.state={
            page: 'Trang thứ 1',
        }
    }

    componentDidMount() {
        const {page} = this.state
        this.props.fetchPeople(page.substr(page.length - 1))
    }

    nextPage = () => {
        this.setState((prevState) =>( {
            page: prevState.page + 1,
        }), () => this.props.fetchPeople(this.state.page))
    }

    handleChoosedPerson = (e) => {
        console.log(e.target.person);
    }

    handlePageClick = page => {
        this.setState({
            page: page,
        }, () => this.props.fetchPeople(this.state.page.substr(this.state.page.length - 1)))
    };

    handleForwardClick = () => {
        if (this.state.page < this.props.allPages) {
            this.setState((prevState) => ({
                page: prevState.page + 1
            }), () => this.props.fetchPeople(this.state.page))
        }
    }

    handleBackwardClick = () => {
        if(this.state.page > 1){
            this.setState((prevState) => ({
                page: prevState.page - 1
            }), () => this.props.fetchPeople(this.state.page))
        }
    }

    createTotalPageArray = () => {
        // var totalPageArray = []
        // for(var i=0; i<this.props.allPages; i++){
        //     totalPageArray.push(i+1)
        // }
        var totalPageArray = Array.from(Array(this.props.allPages).keys()).map(el => `Trang thứ ${el+1}`)
        return totalPageArray
    }


    render() {
        const { loading, people } = this.props
        if(loading || people.length == 0){
            return(
                <Box height='100vh' align='center' justify='center'><h1>ĐANG TẢI DỮ LIỆU...</h1></Box>
            )
        }



        const Pagination = ({currentPage, totalPage}) => {
            var allPages = this.createTotalPageArray()
            return(
                <ThemeContext.Extend
                    value={{
                        select:{
                            background: 'brand_2',
                        }
                    }}
                >
                    <Select
                        size='small'
                        dropHeight='small'
                        options={allPages}
                        value={this.state.page}
                        onChange={({ option }) => this.handlePageClick(option)}
                    />
                </ThemeContext.Extend>
            )



            // <DropButton
            //
            //     color='brand_2'
            //     label={"Trang " + this.state.page}
            //     dropAlign={{ top: 'bottom', right: 'right' }}
            //     dropContent={
            //         <Box gap='xsmall' pad='xsmall' height='300px' justify='start' align='center' overflow="scroll">
            //             {allPages.map((page, i) => {
            //                 return(
            //                     <ThemeContext.Extend
            //                         value={{
            //                             button: {
            //                                 extend:{
            //                                     overflow: 'visible',
            //                                     height: '300px'
            //                                 }
            //                             }
            //                         }}
            //                     >
            //                         <Button type='button' color='brand_2' margin='2px' onClick={() => this.handlePageClick(i+1)} key={i+1} label={`Trang ${i+1}`}/>
            //
            //                     </ThemeContext.Extend>
            //                 )
            //             })}
            //         </Box>
            //     }
            // />





            // return(
            //     <Box direction='row' align='center' gap='5px' margin={{top: '20px'}}>
            //         <Box className='paginateForAndBackward' onClick={this.handleBackwardClick}><p>Trang trước</p></Box>
            //         {allPages.map((page, i) => {
            //             if (i+1 == currentPage) {
            //                 return(
            //                     <Box onClick={() => this.handlePageClick(i+1)} className='paginateBox activePage' key={i+1}><p>{i+1}</p></Box>
            //                 )
            //             }else{
            //                 return(
            //                     <Box onClick={() => this.handlePageClick(i+1)} className='paginateBox' key={i+1}><p>{i+1}</p></Box>
            //                 )
            //             }
            //         })}
            //         <Box className='paginateForAndBackward' onClick={this.handleForwardClick}><p>Trang kế</p></Box>
            //     </Box>
            // )
            // for(var i=1; i<=totalPage; i++){
                // if (i == currentPage) {
                //     this.renderPageBox(i)
                // }else{
                //     return(
                //         <Box key={i}><h3>{i}</h3></Box>
                //     )
                // }
            // }
        }

        return(
            <Box gap='medium' pad='medium'>
                <Box align='end'><Pagination currentPage={this.state.page} totalPage={this.props.allPages}/></Box>
                <Grid
                    columns={['20%', '20%', '20%', '20%']}
                    justifyContent='center'
                    responsive={true}
                    gap='small'

                >
                    {people.map(person => (
                        <Box
                            align="center"
                            justify="center"
                            pad="0px"
                            key={person._id}
                        >
                            <PersonCard key={person._id} person={person} history={this.props.history} Phado={false}/>
                        </Box>
                    ))}
                </Grid>
            </Box>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        allPages: state.allPage,
        domain: state.domain,
        people: state.people,
        loading: state.loading
    };
}

const mapDispatchToProps = dispatch => ({
    fetchPeople: (page) => dispatch(peopleFetchData(page)),
});


export default connect(mapStateToProps, mapDispatchToProps)(People);
