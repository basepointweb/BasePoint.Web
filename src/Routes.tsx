import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routePaths } from '@shared/configs/constants/routes-path'
import Home from '@pages/home/Home'
import GettingStarted from '@/pages/getting-started/GettingStarted'
import Installation from '@pages/getting-started/installation/Installation'
import Generator from '@pages/getting-started/generator/Generator'
import BaseEntity from '@pages/classes/base-entity/base-entity'
import EntityList from '@pages/classes/entity-list/entity-list'
import Repository from '@pages/classes/repository/repository'
import EntityStateControlInterceptorLinfu from '@pages/classes/entity-interceptor/entity-interceptor'
import QueryProviderInterface from '@pages/classes/queryprovider-interface/queryprovider-interface'
import ListItemOutput from '@pages/classes/listitem-output/listitem-output'
import BaseUseCase from '@pages/classes/entity-interceptor/entity-interceptor'
import CommandUseCase from '@pages/classes/command-usecase/command-usecase'
import GetPaginatedUseCase from '@pages/classes/getpaginated-usecase/getpaginated-usecase'
import DapperCommandProvider from '@pages/classes/dapper-commandprovider/dapper-commandprovider'
import DapperCommand from '@pages/classes/dapper-command/dapper-command'
import DapperListItemQueryprovider from '@pages/classes/dapperlistitem-queryprovider/dapperlistitem-queryprovider'
import DapperQueryProvider from '@pages/classes/dapper-queryprovider/dapper-queryprovider'
import DapperTableDefinition from '@pages/classes/dapper-tabledefinition/dapper-tabledefinition'
import DapperColumnDefinition from '@pages/classes/dapper-columndefinition/dapper-columndefinition'

const homeRouteComponents = [
    {
        title: 'Home',
        path: routePaths.HOME,
        component: (<Home/>)
    },
    {
        title: 'Documentation',
        path: routePaths.GETTING_STARTED,
        component: (<GettingStarted/>)
    }
];

const gettingStartedRouteComponents = [
    {
        title: 'Overview',
        path: routePaths.GETTING_STARTED,
        component: (<GettingStarted/>)
    },
    {
        title: 'Extension',
        path: routePaths.GETTING_STARTED_GENERATOR,
        component: (<Generator/>)
    },
    {
        title: 'Installation',
        path: routePaths.GETTING_STARTED_INSTALLATION,
        component: (<Installation/>)
    }
];

const domainLayerClassesRoutes = [
    {
        title: 'BaseEntity',
        path: routePaths.CLASSES_BASE_ENTITY,
        component: (<BaseEntity/>)
    },
    {
        title: 'EntityList',
        path: routePaths.CLASSES_ENTITY_LIST,
        component: (<EntityList/>)
    },
    {
        title: 'Repository',
        path: routePaths.CLASSES_REPOSITORY,
        component: (<Repository/>)
    },
    {
        title: 'EntityStateControlInterceptorLinfu',
        path: routePaths.CLASSES_ENTITY_STATE_INTERCEPTOR,
        component: (<EntityStateControlInterceptorLinfu/>)
    }
];

const applicationLayerClassesRoutes = [
    {
        title: 'ICqrsQueryProvider',
        path: routePaths.CLASSES_I_CQRS_QUERY_PROVIDER,
        component: (<QueryProviderInterface/>)
    },
    {
        title: 'IListItemOutputCqrsQueryProvider',
        path: routePaths.CLASSES_I_LIST_ITEM_OUTPUT_CQRS_QUERY_PROVIDER,
        component: (<ListItemOutput/>)
    },
    {
        title: 'BaseUseCase',
        path: routePaths.CLASSES_BASE_USE_CASE,
        component: (<BaseUseCase/>)
    },
    {
        title: 'CommandUseCase',
        path: routePaths.CLASSES_COMMAND_USE_CASE,
        component: (<CommandUseCase/>)
    },
    {
        title: 'GetPaginatedResultsUseCase',
        path: routePaths.CLASSES_GET_PAGINATED_RESULTS_USE_CASE,
        component: (<GetPaginatedUseCase/>)
    }
];

const infraStructureLayerClassesRoutes = [
    {
        title: 'DapperCqrsCommandProvider',
        path: routePaths.CLASSES_DAPPPER_CQRS_COMMAND_PROVIDER,
        component: (<DapperCommandProvider/>)
    },
    {
        title: 'DapperCommand',
        path: routePaths.CLASSES_DAPPPER_COMMAND,
        component: (<DapperCommand/>)
    },
    {
        title: 'DapperCqrsListItemOutputQueryProvider',
        path: routePaths.CLASSES_DAPPER_CQRS_LIST_ITEM_OUTPUT_QUERY_PROVIDER,
        component: (<DapperListItemQueryprovider/>)
    },
    {
        title: 'DapperCqrsQueryProvider',
        path: routePaths.CLASSES_DAPPER_CQRS_QUERY_PROVIDER,
        component: (<DapperQueryProvider/>)
    },
    {
        title: 'DapperTableDefinition',
        path: routePaths.CLASSESDAPPER_TABLE_DEFINITION,
        component: (<DapperTableDefinition/>)
    },
    {
        title: 'DapperTableColumnDefinition',
        path: routePaths.CLASSES_COLUMN_DEFINITION,
        component: (<DapperColumnDefinition/>)
    }
]

const routeComponents = [...homeRouteComponents, ...gettingStartedRouteComponents, ...domainLayerClassesRoutes, ...applicationLayerClassesRoutes, ...infraStructureLayerClassesRoutes];

const AppRoutes: React.FC = () => (
<Routes>
    {routeComponents.map((routeComponent) => (
        <Route path={routeComponent.path} element={routeComponent.component}/>   
    ))}  
</Routes>
)

export default AppRoutes;

export const HomeRouteComponents = homeRouteComponents;
export const GettingStartedRouteComponents = gettingStartedRouteComponents;
export const DomainLayerRoutes =  domainLayerClassesRoutes;
export const InfraStructureLayerRoutes = infraStructureLayerClassesRoutes;
export const ApplicationLayerRoutes = applicationLayerClassesRoutes;