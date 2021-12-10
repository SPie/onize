import client from './client'

const ENDPOINT_PROJECTS = '/projects'

const projectsList = () => client.get(ENDPOINT_PROJECTS)

const getProject = (uuid) => client.get(ENDPOINT_PROJECTS + '/' + uuid)

const createProject = (label, description, metaDataElements, metaData) => client.post(
    ENDPOINT_PROJECTS,
    {label: label, description: description, metaDataElements: metaDataElements, metaData: metaData}
)

export {
    projectsList,
    getProject,
    createProject
}