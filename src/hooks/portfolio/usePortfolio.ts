import { useState, useEffect } from 'react'
import { 
  getPortfolio, 
  updatePortfolio,
  updateHeroProfile,
  addCertificate,
  addDesign,
  addProject,
  addExperience,
  addEducation,
  addTechSkill,
  addDesignSkill,
  deleteCertificate,
  deleteDesign,
  deleteProject,
  deleteExperience,
  deleteEducation,
  deleteTechSkill,
  deleteDesignSkill,
} from '@/services/portfolio/portfolioService'
import { 
  Portfolio, 
  Certificate, 
  Design, 
  Project, 
  Experience, 
  Education, 
  SkillItem,
  HeroProfile,
} from '@/types/portfolio'
import { toast } from 'sonner'

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [sectionLoading, setSectionLoading] = useState<string | null>(null)

  const fetchPortfolio = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getPortfolio()
      setPortfolio(data)
    } catch (err: any) {
      const message = err.message || 'Failed to fetch portfolio'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const updatePortfolioData = async (data: Partial<Portfolio>) => {
    if (!portfolio) return false
    
    setIsUpdating(true)
    try {
      const updatedData = { ...portfolio, ...data }
      await updatePortfolio(updatedData)
      setPortfolio(updatedData)
      toast.success('Portfolio updated successfully!')
      return true
    } catch (err: any) {
      const message = err.message || 'Failed to update portfolio'
      toast.error(message)
      return false
    } finally {
      setIsUpdating(false)
    }
  }

  const updateHeroData = async (data: HeroProfile) => {
    setIsUpdating(true)
    try {
      await updateHeroProfile(data)
      await fetchPortfolio()
      toast.success('Hero profile updated successfully!')
      return true
    } catch (err: any) {
      const message = err.message || 'Failed to update hero profile'
      toast.error(message)
      return false
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSectionAction = async <T,>(
    action: (data: T) => Promise<any>,
    data: T,
    sectionName: string
  ) => {
    setSectionLoading(sectionName)
    try {
      await action(data)
      await fetchPortfolio()
      return true
    } catch (err: any) {
      const message = err.message || `Failed to ${sectionName}`
      toast.error(message)
      return false
    } finally {
      setSectionLoading(null)
    }
  }

  const handleSectionDelete = async (
    action: (id: string) => Promise<any>,
    id: string,
    sectionName: string
  ) => {
    setSectionLoading(sectionName)
    try {
      await action(id)
      await fetchPortfolio()
      return true
    } catch (err: any) {
      const message = err.message || `Failed to delete ${sectionName}`
      toast.error(message)
      return false
    } finally {
      setSectionLoading(null)
    }
  }

  const handleAddCertificate = (data: Certificate) => 
    handleSectionAction(addCertificate, data, 'certificate')

  const handleDeleteCertificate = (id: string) => 
    handleSectionDelete(deleteCertificate, id, 'certificate')

  const handleAddDesign = (data: Design) => 
    handleSectionAction(addDesign, data, 'design')

  const handleDeleteDesign = (id: string) => 
    handleSectionDelete(deleteDesign, id, 'design')

  const handleAddProject = (data: Project) => 
    handleSectionAction(addProject, data, 'project')

  const handleDeleteProject = (id: string) => 
    handleSectionDelete(deleteProject, id, 'project')

  const handleAddExperience = (data: Experience) => 
    handleSectionAction(addExperience, data, 'experience')

  const handleDeleteExperience = (id: string) => 
    handleSectionDelete(deleteExperience, id, 'experience')

  const handleAddEducation = (data: Education) => 
    handleSectionAction(addEducation, data, 'education')

  const handleDeleteEducation = (id: string) => 
    handleSectionDelete(deleteEducation, id, 'education')

  const handleAddTechSkill = (data: SkillItem) => 
    handleSectionAction(addTechSkill, data, 'tech skill')

  const handleDeleteTechSkill = (id: string) => 
    handleSectionDelete(deleteTechSkill, id, 'tech skill')

  const handleAddDesignSkill = (data: SkillItem) => 
    handleSectionAction(addDesignSkill, data, 'design skill')

  const handleDeleteDesignSkill = (id: string) => 
    handleSectionDelete(deleteDesignSkill, id, 'design skill')

  const handleEditCertificate = async (id: string, data: Certificate) => {
    try {
      await deleteCertificate(id)
      await addCertificate(data)
      await fetchPortfolio()
      return true
    } catch (err: any) {
      toast.error(err.message || 'Failed to update certificate')
      return false
    }
  }

  const handleEditDesign = async (id: string, data: Design) => {
    try {
      await deleteDesign(id)
      await addDesign(data)
      await fetchPortfolio()
      return true
    } catch (err: any) {
      toast.error(err.message || 'Failed to update design')
      return false
    }
  }

  const handleEditProject = async (id: string, data: Project) => {
    try {
      await deleteProject(id)
      await addProject(data)
      await fetchPortfolio()
      return true
    } catch (err: any) {
      toast.error(err.message || 'Failed to update project')
      return false
    }
  }

  const handleEditExperience = async (id: string, data: Experience) => {
    try {
      await deleteExperience(id)
      await addExperience(data)
      await fetchPortfolio()
      return true
    } catch (err: any) {
      toast.error(err.message || 'Failed to update experience')
      return false
    }
  }

  const handleEditEducation = async (id: string, data: Education) => {
    try {
      await deleteEducation(id)
      await addEducation(data)
      await fetchPortfolio()
      return true
    } catch (err: any) {
      toast.error(err.message || 'Failed to update education')
      return false
    }
  }

  const handleEditTechSkill = async (id: string, data: SkillItem) => {
    try {
      await deleteTechSkill(id)
      await addTechSkill(data)
      await fetchPortfolio()
      return true
    } catch (err: any) {
      toast.error(err.message || 'Failed to update tech skill')
      return false
    }
  }

  const handleEditDesignSkill = async (id: string, data: SkillItem) => {
    try {
      await deleteDesignSkill(id)
      await addDesignSkill(data)
      await fetchPortfolio()
      return true
    } catch (err: any) {
      toast.error(err.message || 'Failed to update design skill')
      return false
    }
  }

  useEffect(() => {
    fetchPortfolio()
  }, [])

  return {
    portfolio,
    loading,
    error,
    isUpdating,
    sectionLoading,
    
    refetch: fetchPortfolio,
    updatePortfolio: updatePortfolioData,
    updateHeroProfile: updateHeroData,
    
    addCertificate: handleAddCertificate,
    deleteCertificate: handleDeleteCertificate,
    editCertificate: handleEditCertificate,
    
    addDesign: handleAddDesign,
    deleteDesign: handleDeleteDesign,
    editDesign: handleEditDesign,
    
    addProject: handleAddProject,
    deleteProject: handleDeleteProject,
    editProject: handleEditProject,
    
    addExperience: handleAddExperience,
    deleteExperience: handleDeleteExperience,
    editExperience: handleEditExperience,
    
    addEducation: handleAddEducation,
    deleteEducation: handleDeleteEducation,
    editEducation: handleEditEducation,
    
    addTechSkill: handleAddTechSkill,
    deleteTechSkill: handleDeleteTechSkill,
    editTechSkill: handleEditTechSkill,

    addDesignSkill: handleAddDesignSkill,
    deleteDesignSkill: handleDeleteDesignSkill,
    editDesignSkill: handleEditDesignSkill,
  }
}