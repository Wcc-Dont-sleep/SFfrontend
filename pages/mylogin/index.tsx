import React from 'react';
import { Grid } from '@mui/material';

interface FormState {
  name: string;
  email: string;
}

class MyForm extends React.Component<{}, FormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: '',
      email: ''
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<FormState, keyof FormState>);
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submitted form:', this.state);
  }

  render() {
    return (
       <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
     <Grid item xs={12}>
      <form onSubmit={this.handleSubmit}>

        <div>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
        </div>
        <button type="submit">
            Submit</button>
      </form>
      </Grid>
      </Grid>
    );
  }
}

export default MyForm;




























// import { useState, useEffect, useCallback } from 'react';

// import SidebarLayout from 'src/layouts/SidebarLayout';

// import Head from 'next/head';
// // import PageHeader from 'src/content/Exceptions/WarningInfo/PageHeader';
// import PageHeader from '@/components/PageHeader';
// import Footer from 'src/components/Footer';
// // import Statistics from 'src/content/Management/WarningInfos/Statistics';
// import PageTitleWrapper from 'src/components/PageTitleWrapper';
// import type { WarningInfo } from '@/models/warning_info';
// import React from 'react';
// import { Grid } from '@mui/material';

// function MyloginPage() {


//   // const getWarningInfosStatus = useCallback(async () => {
//   //   try {
//   //     const response = await warningInfoApi.getWarningsStatus(window.localStorage.getItem('selected_entity_id'));

//   //     if (isMountedRef()) {
//   //       setWarningInfos(response);
//   //     }
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // }, [isMountedRef]);

//   return (
//     <>
//       <Head>
//         <title>Warnings</title>
//       </Head>
//       <PageTitleWrapper>
//         {PageHeader("日志告警信息", "系统的所有异常告警信息")}
//       </PageTitleWrapper>

//       <Grid
//         sx={{ px: 4 }}
//         container
//         direction="row"
//         justifyContent="center"
//         alignItems="stretch"
//         spacing={3}
//       >
//         <Grid item xs={12}>
//         </Grid>
//       </Grid>
//       <Footer />
//     </>
//   );
// }

// MyloginPage.getLayout = (page) => (
//     <SidebarLayout>{page}</SidebarLayout>
// );

// export default MyloginPage;
