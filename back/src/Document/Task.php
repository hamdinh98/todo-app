<?php
declare(strict_types=1);
namespace App\Document;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 *  @ODM\Document(repositoryClass="App\Repository\TaskRepository")
 */
class Task
{
    /** @ODM\Field(type="string")
     * @Assert\NotBlank(message = "title is required")
     */
    private string $title;
    /** @ODM\Id(type="string") */
    private  $id;
    /** @ODM\Field(type="string") */
    private string $note;
    /** @ODM\Field(type="string")
     ** @Assert\Choice({"todo", "in-progress", "done"}, message="Choose a valid status.")
     */
    private $status;
    /** @ODM\Field(type="date") */
    private $date;
}